import React from "react";

const SearchInput = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="검색해"
      onChange={onSearch}
      value={searchTerm}
    />
  );
};

export default SearchInput;
