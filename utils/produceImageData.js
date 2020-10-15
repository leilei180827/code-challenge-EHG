const { RGBDistance, arrayIndexDistance,RGBGrayLevel,HSVDistance } = require("./calculateDistance");
const { WIDTH, HEIGHT ,COLOR_STEP} = require("../config/constants");

// product sorted imageData according to the chosen tab for canvas to draw image
function produceImageData(imageType) {
  let colors = productDiscreetColors();
  let result = new Array(WIDTH * HEIGHT * 4).fill(0);
  let allColors=[]
  let sortArrayIndex = [];
  //draw from the corner but draw from middle when imageType is rgb-middle
   let baseIndex = imageType==="gradual-rgb-middle" ? [128, 64]: [0,0];
  let baseColor = [8, 8, 8, 255];

   // sort array index according to its spatial distance like [0,0] is closer to [1,1] rather than [2,0]
  for (let i = 0; i < WIDTH; i++) { 
    for (let j = 0; j < HEIGHT; j++) { 
      sortArrayIndex.push([i,j])
    }
  }
  sortArrayIndex = sortArrayIndex.sort((a, b) => arrayIndexDistance(a, baseIndex) - arrayIndexDistance(b, baseIndex));
  
  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < colors.length; j++) {
      for (let k = 0; k < colors.length; k++) {
        allColors.push([colors[i], colors[j], colors[k], 255]);
      }
    }
  }
  switch (imageType) {
    case "gray":
      // sort colors according to the gray level to baseColor
      allColors = allColors.sort((a, b) => RGBGrayLevel(a, baseColor) - RGBGrayLevel(b, baseColor));
      break;
    case "hsv":
      // sorted colors according to hsv to baseColor
      allColors = allColors.sort((a, b) => HSVDistance(a, baseColor) - HSVDistance(b, baseColor));
      break;
    case "default":
      // no sort, just draw according to the sequences when they're generate
      result = produceDefaultImageData(colors);
      return result;
    default:
      // sort colors according to rgb distance to baseColor
      allColors = allColors.sort((a, b) => RGBDistance(a, baseColor) - RGBDistance(b, baseColor));
      break;
  }
  sortArrayIndex.map((item, index) => {
    let start = (item[0] + item[1] * WIDTH) * 4;
    let chosenColorIndex = -1;
    
    if (imageType.includes('gradual-rgb')  && index !== 0) {
      let surroundColors = checkAdjacentIndex(item[0], item[1], result);
      // coz allColors has been sorted. so the most suitable /nearest color should be within the first nth colors
      // here assume n=100 in order to save time complexity and avoid affect performance greatly
      chosenColorIndex = findNearestColor(surroundColors, allColors.slice(0, 100));
    } else {
      chosenColorIndex = index;
    }
    if (chosenColorIndex===-1) { 
      return;
    }
    result[start] = allColors[chosenColorIndex][0];
    result[start + 1] = allColors[chosenColorIndex][1];
    result[start + 2] = allColors[chosenColorIndex][2];
    result[start + 3] = allColors[chosenColorIndex][3];
    // remove the color which has been used
    imageType.includes('gradual-rgb') && allColors.splice(chosenColorIndex, 1);
  })
  return result;
}

//choose the most suitable color for current position according to its surrounds
// most suitable means the sum of RGB distances is the least
function findNearestColor(surroundColors, colors) { 
  let minDistance =Infinity;
  let minIndex = -1;
  colors.map((cItem, cIndex) => { 
    let distance = 0;
    //sum RGB distance
    surroundColors.map((sItem) => distance += RGBDistance(sItem, cItem));
    // update minDistance and minIndex
    if (distance !== 0 && distance/surroundColors.length < minDistance) { 
      minIndex = cIndex;
      minDistance = distance/surroundColors.length;
    }
  })
  return minIndex;
}

// collect colors from surrounds(North,East,South,West) of current position
function checkAdjacentIndex(x, y,result) { 
  let surroundColors = [];
  //all possible surrounds 
  let surrounds = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];

  surrounds.map(surroundsItem => {
    //in valid range
    if (surroundsItem[0]>-1 && surroundsItem[0]< 256 &&  surroundsItem[1]>-1 && surroundsItem[1] < 128) {
      let start = (surroundsItem[0] + surroundsItem[1] * WIDTH) * 4;
      // the surround has been drawn
      if (result[start] !== 0) { 
        surroundColors.push([result[start],result[start+1],result[start+2],result[start+3]])
      }
    }
  });
  return surroundColors;
}

function productDiscreetColors() { 
  let result = [];
  for (let i = 8; i <= 256; i = i + COLOR_STEP) {
    i === 256 ? result.push(i - 1) : result.push(i);
  }
  return result
}

// product imageData for canvas to draw image
function produceDefaultImageData(colors) {
  // let colors = productDiscreetColors();
  let result = [];

  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < colors.length; j++) {
      for (let k = 0; k < colors.length; k++) {
        result.push(colors[i]);
        result.push(colors[j]);
        result.push(colors[k]);
        result.push(255);
      }
    }
  }
  return result;
}
module.exports = {produceImageData };
