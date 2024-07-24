import React, { useEffect, useState } from "react";
import CheckBox from "./Sections/CheckBox";
import Radiobox from "./Sections/Radiobox";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import axiosInstance from "../../../utils/axios";
import { category, prices } from "../../../utils/filterData";

const Home = () => {
  const limit = 4;
  const [searchTerm, setSearchTerm] = useState("");
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
      searchTerm,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const handleFilters = (newFilteredData, category) => {
    const newFilters = { ...filters };
    newFilters[category] = newFilteredData;
    if (category === "price") {
      const priceValues = handlePrice(newFilteredData);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const handlePrice = (value) => {
    let array = [];

    for (let key in prices) {
      if (prices[key]._id === parseInt(value, 10)) {
        array = prices[key].array;
      }
    }
    return array;
  };

  const showFilteredResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm,
    };
    fetchProducts(body);
    setSkip(0);
  };

  const handleSearchTerm = (event) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: event.target.value,
    };
    setSkip(0);
    setSearchTerm(event.target.value);
    fetchProducts(body);
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
          <Radiobox
            prices={prices}
            checkedPrice={filters.price}
            onFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
      </div>

      <div className="search-box">
        <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
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
