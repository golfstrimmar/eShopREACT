import { useState, useEffect } from "react";
import axios from "axios";

const useFilter = (priceRange) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const applyFilters = () => {
      const filters = {
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };
      axios
        .get(`${process.env.REACT_APP_API_URL}/products`, { params: filters })
        .then((response) => setFilteredProducts(response.data))
        .catch((error) =>
          console.error("Error fetching filtered products:", error)
        );
    };

    applyFilters();
  }, [priceRange]);

  return filteredProducts;
};

export default useFilter;
