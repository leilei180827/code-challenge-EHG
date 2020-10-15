import React, { useState, useEffect,useCallback } from "react";
import { Image } from "antd";
import { getImage } from "../network/requestImage";
import "../assets/css/imageContainer.css";
import Reload from "./reload";
import Loading from "./loading";

export default function ImageContainer(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [needReload, setNeedReload] = useState(true);

  const loadImage = useCallback(() => {
    setIsLoading(true);
    getImage({ imageType: props.imageType })
      .then(({ data }) => {
        setImageSource(data.imageSource);
        setNeedReload(false);
        props.imageType.includes('gradual-rgb')  ?
          setTimeout(() => {
            setIsLoading(false);
          }, 1000) : setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setNeedReload(true)
      });
  },[props]);

  const handleImageReload = () => { 
    setImageSource("");
    setNeedReload(false)
    loadImage();
  }
  const handleImageLoaded = () => { 
    console.log("image loaded")
    setIsLoading(false);
  }
  useEffect(() => {
    loadImage();
  }, [loadImage]);
  
  return (
    <div id="main-image">
      {isLoading ? <Loading /> :
        (needReload ? <Reload refresh={handleImageReload} /> :
          <Image       
            className="images"       
            src={imageSource}
            onLoad={handleImageLoaded}
            onError={handleImageReload}
            alt="loading"        
          />)
      }
      
    </div>
  );
}
