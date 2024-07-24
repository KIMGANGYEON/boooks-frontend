import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/thunkFunctions";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addToCart({ productId: product._id }));
  };
  return (
    <div>
      <p>상품정보</p>
      <ul>
        <li>
          <span>가격 : </span>
          {product.price}
        </li>
        <li>
          <span>팔린개수 </span>
          {product.sold}
        </li>
        <li>
          <span>가격 : </span>
          {product.description}
        </li>
      </ul>

      <div>
        <button onClick={handleClick}>장바구니로</button>
      </div>
    </div>
  );
};

export default ProductInfo;
