import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";

const DetailProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axiosInstance.get(
          `/product/${productId}?type=single`
        );
        setProduct(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) {
    return;
  }

  return (
    <section>
      <div>
        <h1>{product?.title}</h1>
      </div>

      <div style={{ display: "flex", gap: 100 }}>
        <div>
          <ProductImage product={product} />
        </div>
        <div>
          <ProductInfo product={product} />
        </div>
      </div>
    </section>
  );
};

export default DetailProductPage;
