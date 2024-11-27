import React from "react";
import { Slider, TextField, Button, Typography } from "@mui/material";
import usePriceRange from "../../hooks/usePriceRange";
import useCategories from "../../hooks/useCategories";

const Filter = ({ applyFilters }) => {
  const { priceRange, handlePriceChange } = usePriceRange();
  const categories = useCategories();

  return (
    <div className="filterContainer">
      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={(_, newValue) => applyFilters(newValue)}
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => applyFilters(priceRange)}
        style={{ marginTop: "20px" }}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default Filter;
