import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";

const useFilteredProducts = (priceRange) => {
  const dispatch = useDispatch();

  const applyFilters = () => {
    const filters = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/products`, { params: filters })
      .then((response) => {
        const productsWithCategoryNames = response.data.map((product) => ({
          ...product,
          categoryName: product.category
            ? product.category.name
            : "No Category",
        }));
        dispatch(setProducts(productsWithCategoryNames));
      })
      .catch((error) => {
        console.error("Error fetching products with filters:", error);
      });
  };

  return { applyFilters };
};

export default useFilteredProducts;
