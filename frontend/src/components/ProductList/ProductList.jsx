import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import useProducts from "../../hooks/useProducts";
import "./ProductList.scss";
import Filter from "../Filter/Filter";
import SearchBar from "./../SearchBar/SearchBar";
import ProductCard from "../ProductCard/ProductCard";

// ==========================================
const ProductList = ({ onEdit }) => {
  useProducts();
  let products = useSelector((state) => state.products);

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  // Состояние фильтрованных продуктов
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Индексы для пагинации
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Обработчик изменения страницы пагинации
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //=========================================
  useEffect(() => {
    if (filteredProducts.length === 0) {
      setFilteredProducts([]);
    } else if (filteredProducts.length > 0) {
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [products, filteredProducts]);

  // ==============================================
  const handleFilteredProducts = (filteredData) => {
    console.log("filteredData", filteredData);
    setFilteredProducts(filteredData);
    setCurrentPage(1);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <section>
      <SearchBar onSearch={handleSearch} />
      <div className="Allproducts">
        {/* ----------------Форма фильтрации------------------*/}
        <Filter handleFilteredProducts={handleFilteredProducts} />
        {/* -------------------- */}
        <div className="Allproducts-container">
          {currentProducts.map((product) => (
            <ProductCard
              key={product._id}
              pro={{
                id: product._id,
                onEdit,
              }}
            />
          ))}
          <Pagination
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            className="pagination"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductList;
