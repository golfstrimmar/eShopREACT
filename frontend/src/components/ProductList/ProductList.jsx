import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Rating,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useProducts from "../../hooks/useProducts";
import AddToCart from "../AddToCart/AddToCart";
import "./ProductList.scss";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/productsActions";
import { productDelite } from "../../redux/actions/productsActions";
import { deliteFromCart } from "../../redux/actions/cartActions";
import useCategories from "../../hooks/useCategories";
import useUpdateCategory from "../../hooks/useUpdateCategory";
import Filter from "../Filter/Filter";
import axios from "axios";

// ==========================================
const ProductList = ({ onEdit }) => {
  const dispatch = useDispatch();
  useProducts();
  let products = useSelector((state) => state.products);

  //------------ Categories
  const categories = useCategories();
  const handleCategoryChange = useUpdateCategory(products);

  // -----------------Rating-------------------
  const handleRatingChange = async (event, newValue, product) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/products/rate`,
        {
          productId: product._id,
          rating: newValue,
        }
      );
      console.log("Rating updated:", response.data.product.rating);
      dispatch(
        setProducts(
          products.map((prod) =>
            prod._id === product._id
              ? { ...prod, rating: response.data.product.rating }
              : prod
          )
        )
      );
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  // --------------------------------

  // --------------------------------

  // --------------------------------
  const handlerProductDelite = async (product) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/products/delite`,
      product
    );
    setProducts(products.filter((item) => item._id !== product._id));
    dispatch(productDelite(product));
    dispatch(deliteFromCart(product._id));
  };
  // --------------------------------------
  const location = useLocation();
  const isCart = location.pathname.includes("/cart");
  const isAdmin = location.pathname.includes("/admin");

  // -------------------------------
  return (
    <div className="Allproducts">
      {/* ----------------Форма фильтрации------------------*/}
      <Filter />

      {/* -------------------- */}
      <div className="Allproducts-container">
        {products.map((product) => (
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
                Description: {product.description}
              </Typography>
              <Typography variant="p">
                Category:{" "}
                {product.category ? product.category.name : "No category"}
              </Typography>

              {/*  рейтинг  */}
              <Rating
                onChange={(e, newValue) =>
                  handleRatingChange(e, newValue || 5, product)
                }
                value={product.rating}
                precision={0.5}
              />
              <Typography variant="p">Average rating</Typography>
              <span>{product.rating || 0} / 5</span>
              {/* Добавляем селект для изменения категории */}
              {isAdmin && (
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={product.category ? product.category._id : ""}
                    onChange={(e) =>
                      handleCategoryChange(product._id, e.target.value)
                    }
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <Link to={`/product/${product._id}`} className="cardLink">
                <Button variant="outlined" color="primary">
                  Learn more
                </Button>
              </Link>
              {!isCart && !isAdmin && <AddToCart product={product} />}
              {isAdmin && (
                <>
                  <IconButton onClick={() => onEdit(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className="deliteCard"
                    onClick={() => handlerProductDelite(product)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
