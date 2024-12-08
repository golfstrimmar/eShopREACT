import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import AddToCart from "../components/AddToCart/AddToCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useProducts();
  const products = useSelector((state) => state.products);
  const product = products.find((item) => item._id === id);

  if (!product) {
    return <Typography variant="h6">Товар не найден</Typography>;
  }
  const currentIndex = products.findIndex((item) => item._id === id);
  const prevProduct = products[currentIndex - 1];
  const nextProduct = products[currentIndex + 1];
  const goToPrevious = () => {
    if (prevProduct) {
      navigate(`/product/${prevProduct._id}`);
    }
  };

  const goToNext = () => {
    if (nextProduct) {
      navigate(`/product/${nextProduct._id}`);
    }
  };

  return (
    <Card className="pageContent">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton onClick={goToPrevious} disabled={!prevProduct}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">{product.name}</Typography>
        <IconButton onClick={goToNext} disabled={!nextProduct}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      <CardMedia component="img" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="body1">Price: {product.price} $.</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <AddToCart product={product} />
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
