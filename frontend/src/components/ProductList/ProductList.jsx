import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Slider,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Rating,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useProducts from "../../hooks/useProducts";
import AddToCart from "../AddToCart/AddToCart";
import "./ProductList.scss";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/productsActions";
import { productDelite } from "../../redux/actions/productsActions";
import axios from "axios";

// ==========================================
const ProductList = () => {
  const dispatch = useDispatch();
  useProducts();
  let products = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  //------------  категории
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  // Обновляем категорию продукта
  const handleCategoryChange = (productId, newCategoryId) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/products/${productId}/updateCategory`,
        {
          category: newCategoryId,
        }
      )
      .then((response) => {
        // Обновляем продукт в хранилище Redux
        dispatch(
          setProducts(
            products.map((product) =>
              product._id === productId ? response.data : product
            )
          )
        );
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };
  // --------------------

  // ------------------------------------
  const handleRatingChange = async (event, newValue, product) => {
    setValue(newValue);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/products/rate`,
        {
          productId: product._id,
          rating: newValue,
        }
      );
      console.log("Rating updated:", response.data);
      dispatch(
        setProducts(
          products.map((prod) =>
            prod._id === product._id ? response.data.product : prod
          )
        )
      );
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };
  // ------------------------------------
  const applyFilters = () => {
    const filters = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
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
        console.log("Products with category names:", productsWithCategoryNames);
        dispatch(setProducts(productsWithCategoryNames));
      })
      .catch((error) => {
        console.error("Error fetching products with filters:", error);
      });
  };

  // ----------------------------------
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
  // ----------------------------------

  // --------------------------------
  const handlerProductDelite = async (product) => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/products/delite`,
      product
    );
    setProducts(products.filter((item) => item._id !== product._id));
    dispatch(productDelite(product));
  };
  // --------------------------------------
  const location = useLocation();
  const isCart = location.pathname.includes("/cart");
  const isAdmin = location.pathname.includes("/admin");

  // -------------------------------
  return (
    <div className="Allproducts">
      {/* ----------------Форма фильтрации------------------*/}
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
        <Button
          variant="contained"
          color="primary"
          onClick={applyFilters}
          style={{ marginTop: "20px" }}
        >
          Apply Filters
        </Button>
      </div>
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
                Category:{" "}
                {product.category ? product.category.name : "No category"}
              </Typography>
              {/*  рейтинг  */}
              <Rating
                onChange={(e, newValue) =>
                  handleRatingChange(e, newValue, product)
                }
                value={product.rating || 0} // Используем текущий рейтинг
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
    </div>
  );
};

export default ProductList;
