import React from "react";
import { Typography } from "@mui/material";
import ProductList from "../components/ProductList/ProductList";
const Home = () => {
  return (
    <div className="pageContent">
      <Typography variant="h4" gutterBottom>
        Наши товары
      </Typography>
      <ProductList />
    </div>
  );
};

export default Home;
