import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImageSlider = ({ images }) => {
  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop>
      {images.map((image) => (
        <div key={image}>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/${image}`}
            style={{ width: "100%", height: "300px" }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
