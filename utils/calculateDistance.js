function arrayIndexDistance(a,b){
    return Math.pow((a[0]-b[0]),2)+Math.pow((a[1]-b[1]),2)
}
function RGBDistance(a, b) {
  return Math.sqrt(Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2) + Math.pow((a[2] - b[2]), 2));
}
function RGBGrayLevel(a,b) { 
    return (a[0]-b[0])*0.299 + (a[1]-b[1])*0.587 + (a[2]-b[2])*0.114;
}

function HSVDistance(a, b) {
  let h1 = rgbToHsv(a);
  let h2 = rgbToHsv(b);
  let dh = Math.sin(h1[0]) * h1[1] * h1[2] - Math.sin(h2[0]) * h2[1] * h2[2];
  let ds = Math.cos(h1[0]) * h1[1] * h1[2] - Math.cos(h2[0]) * h2[1] * h2[2];
  let dv = h1[2] - h2[2];
  return Math.sqrt(dh*dh+ds*ds+dv*dv)
}

// Converts an RGB color value to HSV. Conversion formula
function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;
  var d = max - min;
  s = max == 0 ? 0 : d / max;
  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [ h, s, v ];
}

module.exports = {RGBDistance,arrayIndexDistance,RGBGrayLevel,HSVDistance}