import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

const FileUpload = ({ onImageChange, images }) => {
  const handleDrop = async (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    try {
      const response = await axiosInstance.post(
        "/product/image",
        formData,
        config
      );
      onImageChange([...images, response.data.filename]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  };

  return (
    <div className="product-fileupload">
      <div>
        {images.map((image) => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img
              src={`${process.env.REACT_APP_BASE_URL}/${image}`}
              alt={image}
            />
          </div>
        ))}
      </div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="drop-section">
            <div
              {...getRootProps()}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input {...getInputProps()} />
              <p>이미지 업로드</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default FileUpload;
