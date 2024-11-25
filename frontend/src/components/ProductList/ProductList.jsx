import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useProducts from "../../hooks/useProducts";
import AddToCart from "../AddToCart/AddToCart";
import "./ProductList.scss";
import { useDispatch } from "react-redux";
import { productDelite } from "../../redux/actions/productsActions";
import axios from "axios";
// ==========================================
const ProductList = () => {
  const dispatch = useDispatch();
  useProducts();
  const products = useSelector((state) => state.products);
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);
  const handlerProductDelite = async (product) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/products/delite`,
      product
    );
    setLocalProducts(localProducts.filter((item) => item._id !== product._id));
    dispatch(productDelite(product));
  };
  const location = useLocation();
  const isCart = location.pathname.includes("/admin");
  const isAdmin = location.pathname.includes("/admin");
  // -------------------------------
  return (
    <div className="Allproducts">
      {localProducts.map((product) => (
        <Card key={product._id} className="productCard">
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
          />
          <CardContent className="cardContent">
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="p">Цена: {product.price} руб.</Typography>
            <Link to={`/product/${product._id}`} className="cardLink">
              <Button variant="outlined" color="primary">
                Learn more
              </Button>
            </Link>
            {!isCart && <AddToCart product={product} />}
            {isAdmin && (
              <Button
                variant="outlined"
                color="primary"
                className="deliteCard"
                onClick={() => handlerProductDelite(product)}
              >
                Delite
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
