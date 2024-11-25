import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import AddToCart from "../components/AddToCart/AddToCart";

const ProductDetails = () => {
  const { id } = useParams();

  useProducts();
  const products = useSelector((state) => state.products);
  const product = products.find((item) => item._id === id);
  if (!product) {
    return <Typography variant="h6">Товар не найден</Typography>;
  }

  return (
    <Card className="pageContent">
      <CardMedia component="img" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body1">Цена: {product.price} руб.</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <AddToCart product={product} />
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
