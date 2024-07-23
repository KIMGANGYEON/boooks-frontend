import React, { useEffect, useState } from "react";
import CheckBox from "./Sections/CheckBox";
import Radiobox from "./Sections/Radiobox";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import axiosInstance from "../../../utils/axios";
import { category } from "../../../utils/filterData";

const Home = () => {
  const limit = 4;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, []);

  const fetchProducts = async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
    searchTerm = "",
  }) => {
    const params = {
      skip,
      limit,
      filters,
      searchTerm,
    };
    try {
      const response = await axiosInstance.get("/product", { params });

      if (loadMore) {
        setProducts([...products, ...response.data.products]);
      } else {
        setProducts(response.data.products);
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const handleFilters = (newFilteredData, category) => {
    const newFilters = { ...filters };
    console.log(category);
    newFilters[category] = newFilteredData;

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const showFilteredResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters,
    };
    fetchProducts(body);
    setSkip(0);
  };

  return (
    <section className="home">
      <div>
        <h2>Book</h2>
      </div>

      <div className="filter-box">
        <div>
          <CheckBox
            category={category}
            checkedCategory={filters.category}
            onFilters={(filters) => handleFilters(filters, "category")}
          />
        </div>
        <div>
          <Radiobox />
        </div>
      </div>

      <div className="search-box">
        <SearchInput />
      </div>

      <div className="carditem-box">
        {products.map((product) => (
          <CardItem product={product} key={product._id} />
        ))}
      </div>
      {hasMore && (
        <div className="button-box" onClick={handleLoadMore}>
          <button>더보기</button>
        </div>
      )}
    </section>
  );
};

export default Home;
