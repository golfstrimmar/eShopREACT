import React, { useState } from "react";
import { IconButton, Typography, Button } from "@mui/material";
import { addToCart } from "../../redux/actions/cartActions";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import ModalAddCart from "../Modal/ModalAddCart";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// ========================================
const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    if (!user) {
      setMessage("Please login to add to cart");
      setTimeout(() => {
        setMessage("");
      }, 1500);
    } else {
      dispatch(addToCart(product));
      setOpenModal(true);
      setTimeout(() => {
        setOpenModal(false);
      }, 1500);
    }
  };
  const [openModal, setOpenModal] = useState(false);
  // --------------------------------------
  const location = useLocation();
  const isCart = location.pathname.includes("/cart");
  const isProduct = location.pathname.includes("/product");
  // ------------------------------
  return (
    <section className="addToCart">
      <Typography variant="h6" color="error">
        {message}
      </Typography>

      {isProduct ? (
        <Button color="primary" variant="contained" onClick={handleAddToCart}>
          Add to cart
        </Button>
      ) : (
        <IconButton onClick={handleAddToCart} className="addToCartButton">
          <AddShoppingCart color="primary" />
        </IconButton>
      )}
      <ModalAddCart open={openModal}></ModalAddCart>
    </section>
  );
};

export default AddToCart;
