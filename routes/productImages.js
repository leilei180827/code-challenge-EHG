const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const { drawImage } = require("../utils/drawImages");
const imageDirectory = "./public/images";

router.get("/", (req, res) => {
  try {
    //if images directory not exists,create it
    !fs.existsSync(imageDirectory) && fs.mkdirSync(imageDirectory);
    //
    const imageType = req.query.imageType; 
    const imageSourceDes = `./public/images/${imageType}.png`;
    fs.access(imageSourceDes, (err) => {
      //image not exists, need to generate it
      if (err) {
        const canvas = drawImage(imageType);
        const filePath = path.join(__dirname, "..", "public","images",`${imageType}.png`);
        var buf = canvas.toBuffer();
        fs.writeFileSync(filePath, buf);
      } 
    });
    //make url
    const url = req.protocol + "://" + req.headers.host + `/images/${imageType}.png`;
    // success response
    res.status(200).json({
      success: true,
      imageType:imageType,
      imageSource: url,
    });
  } catch (error) {
    // failure response
    res.status(304).json({
      success: false,
      message: error.toString(),
    });
  }
});

module.exports = router;
