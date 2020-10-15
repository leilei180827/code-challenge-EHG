import React, { useState } from "react";
import ImageContainer from "./components/imageContainer";
import Tab from "./components/tab";
import "./App.css";

const App = () => {
  const [imageType, setImageType] = useState("default");
  const handleImageTypeTab = (type) => { 
    setImageType(type);
  }
  return (
    <>
      <ImageContainer  imageType={imageType} />
      <Tab handleImageTypeTab={handleImageTypeTab} />
    </>
  );
};

export default App;
