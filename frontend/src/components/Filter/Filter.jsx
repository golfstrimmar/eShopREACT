import React, { useEffect, useState } from "react";
import {
  Slider,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/productsActions";
import useCategories from "../../hooks/useCategories";
// --------------------

// --------------------
const Filter = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const categories = useCategories();
  // --------------------

  // --------------------
  const handlePriceChange = (event, position) => {
    let value = Number(event.target.value);
    if (isNaN(value) || value < 0) value = 0;
    if (position === "min") {
      if (value > priceRange[1]) value = priceRange[1];
      setPriceRange([value, priceRange[1]]);
    } else if (position === "max") {
      if (value < priceRange[0]) value = priceRange[0];
      setPriceRange([priceRange[0], value]);
    }
  };
  useEffect(() => {
    if (priceRange[0] > priceRange[1]) {
      setPriceRange([priceRange[1], priceRange[0]]);
    }
  }, [priceRange]);

  // --------------------

  // --------------------
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };
  // --------------------

  // --------------------
  const applyFilters = () => {
    const filters = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      categories: selectedCategories,
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
  return (
    <div className="filterContainer">
      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={(_, newValue) => setPriceRange(newValue)}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value} $.`}
        min={0}
        max={1000}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Min Price"
          variant="outlined"
          type="number"
          value={priceRange[0]}
          onChange={(e) => handlePriceChange(e, "min")}
          style={{ width: "48%" }}
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Max Price"
          variant="outlined"
          type="number"
          value={priceRange[1]}
          onChange={(e) => handlePriceChange(e, "max")}
          style={{ width: "48%" }}
          inputProps={{ min: 0 }}
        />
      </div>
      <div>
        <Typography gutterBottom>Categories</Typography>
        <div>
          {categories.map((category) => (
            <FormControlLabel
              key={category._id}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => handleCategoryChange(category._id)}
                  name={category.name}
                />
              }
              label={category.name}
            />
          ))}
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={applyFilters}
        style={{ marginTop: "20px" }}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default Filter;
