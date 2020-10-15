const Canvas = require("canvas");
const { WIDTH, HEIGHT } = require("../config/constants");
const { produceImageData } = require("./produceImageData");

function drawImage(imageType) {
  const imageData = produceImageData(imageType);
  //produce canvas
  const canvas = Canvas.createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  //create image data for canvas
  const image = ctx.createImageData(WIDTH, HEIGHT);
  // console.log(image);
  const data = image.data;
  //the length of image data
  let length = HEIGHT * WIDTH * 4;

  for (let i = 0; i < length; i += 4) {
    data[i] = imageData[i]; //  red
    data[i + 1] = imageData[i + 1]; //  green
    data[i + 2] = imageData[i + 2]; // blue
    data[i + 3] = imageData[i + 3]; //  opaque
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
}
module.exports = { drawImage };
