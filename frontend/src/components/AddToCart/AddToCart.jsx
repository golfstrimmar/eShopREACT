import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ display: "inline-block" }}
      onClick={handleAddToCart}
      className="addToCartButton"
    >
      Add to Cart
    </Button>
  );
};

export default AddToCart;
