import React from "react";

const Radiobox = ({ prices, checkedPrice, onFilters }) => {
  return (
    <div>
      {prices?.map((price) => (
        <div key={price._id}>
          <input
            type="radio"
            checked={checkedPrice === price.array}
            onChange={(e) => onFilters(e.target.value)}
            id={price._id}
            value={price._id}
          />{" "}
          <label htmlFor={price._id}>{price.name}</label>
        </div>
      ))}
    </div>
  );
};

export default Radiobox;
