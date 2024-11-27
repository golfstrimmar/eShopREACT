import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddToCart from "../AddToCart/AddToCart";

const ProductCard = ({ product, handleRatingChange }) => {
  return (
    <Card key={product._id} className="productCard">
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent className="cardContent">
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="p">Price: {product.price} $</Typography>
        <Typography variant="p">
          Category: {product.category ? product.category.name : "No category"}
        </Typography>
        <Rating
          onChange={(e, newValue) => handleRatingChange(e, newValue, product)}
          value={product.rating || 0}
          precision={0.5}
        />
        <span>{product.rating || 0} / 5</span>
        <Link to={`/product/${product._id}`} className="cardLink">
          <Button variant="outlined" color="primary">
            Learn more
          </Button>
        </Link>
        <AddToCart product={product} />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
