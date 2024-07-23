import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../../../../components/ImageSlider";

const CardItem = ({ product }) => {
  return (
    <div className="carditem">
      <ImageSlider images={product.images} />
      <Link to={`/product/${product._id}`}>
        <p>{product.title}</p>
        <p>{product.category}</p>
        <p>{product.price}</p>
      </Link>
    </div>
  );
};

export default CardItem;
