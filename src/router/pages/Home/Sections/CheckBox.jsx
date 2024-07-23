import React from "react";

const CheckBox = ({ category, checkedCategory, onFilters }) => {
  const handleToggle = (categoryId) => {
    const currentIndex = checkedCategory.indexOf(categoryId);
    const newChecked = [...checkedCategory];

    if (currentIndex === -1) {
      newChecked.push(categoryId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onFilters(newChecked);
  };
  return (
    <div>
      {category?.map((category) => (
        <div key={category._id}>
          <input type="checkbox" onChange={handleToggle(category._id)} />{" "}
          <label>{category.name}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
