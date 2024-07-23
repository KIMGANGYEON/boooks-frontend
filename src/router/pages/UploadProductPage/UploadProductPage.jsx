import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileUpload from "../../../components/FileUpload";

const category = [
  { key: 1, value: "수필" },
  { key: 2, value: "소설" },
  { key: 3, value: "경제" },
  { key: 4, value: "문학" },
  { key: 5, value: "공부" },
  { key: 6, value: "자기계발" },
  { key: 7, value: "외국어" },
  { key: 8, value: "만화" },
];

const UploadProductPage = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    category: 1,
    images: [],
  });

  const userData = useSelector((state) => state.user?.userData);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImages = (newImages) => {
    setProduct((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      writer: userData.id,
      ...product,
    };

    try {
      const response = await axiosInstance.post("/product/upload", body);
      if (response.status === 201) {
        toast.success("상품 업로드가 완료되었습니다");
      }
      navigate("/");
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };

  return (
    <section className="product-upload">
      <div className="upload-header">
        <h1>상품 업로드</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <FileUpload images={product.images} onImageChange={handleImages} />
        <div>
          <label htmlFor="title">상품명</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleChange}
            value={product.title}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label htmlFor="price">상품 가격</label>
          <input
            name="price"
            type="number"
            id="price"
            onChange={handleChange}
            value={product.price}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label htmlFor="description">상품 설명</label>
          <textarea
            name="description"
            id="description"
            type="text"
            onChange={handleChange}
            value={product.description}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label htmlFor="category">카테고리</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            value={product.category}
          >
            {category.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">상품 등록하기</button>
      </form>
    </section>
  );
};

export default UploadProductPage;
