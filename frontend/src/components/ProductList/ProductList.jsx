import React, { useEffect, useState } from "react";
import { CircularProgress, Pagination, Typography } from "@mui/material";
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
  // --------------Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  // -------------Состояние фильтрованных продуктов
  const [filteredProducts, setFilteredProducts] = useState(products);
  let currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  // -------------------------
  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [products]);
  //----------- Обработчик изменения страницы пагинации
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //=========================================
  useEffect(() => {
    setMessage("");
    if (filteredProducts.length === products.length) {
      setFilteredProducts(products);
    } else if (
      filteredProducts.length !== products.length &&
      filteredProducts.length > 0
    ) {
      setFilteredProducts(filteredProducts);
    }
    setMessage("No products found");
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
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
          {loading ? (
            <div
              className="loading-container"
              style={{
                gridColumn: "span 2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : currentProducts.length === 0 ? (
            <Typography variant="h5" gutterBottom>
              {message}
            </Typography>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
