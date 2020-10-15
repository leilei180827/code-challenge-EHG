const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

const publicPath = path.join(__dirname, "public");
//port listening to
const port = process.env.PORT || 8000;
//import router
const productImagesRouter = require("./routes/productImages");


app.use(cors());
app.use(express.static(publicPath));
app.use("/api/images", productImagesRouter);

// app.use("/api/circle", circleRouter);
app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});
