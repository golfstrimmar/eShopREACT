import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddToCart from "../AddToCart/AddToCart";
import RatingComponent from "../Rating/Rating";
import "./Popular.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import useProducts from "../../hooks/useProducts";
import "swiper/css/navigation";
import "swiper/scss/navigation";
import ProductCard from "../ProductCard/ProductCard";
// ===================================

function Popular({
  isAdmin,
  isCart,
  categories,
  handleCategoryChange,
  onEdit,
  handlerProductDelite,
  openModal,
  handleOpenModal,
  handleCloseModal,
}) {
  useProducts();
  let products = useSelector((state) => state.products);
  // Фильтруем продукты по рейтингу >= 4
  const filteredProducts = products.filter((product) => product.rating >= 4);

  return (
    <div className="popular">
      <Typography variant="h3" gutterBottom>
        Most popular products
      </Typography>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop
        navigation={{
          nextEl: ".swiper-button-prev",
          prevEl: ".swiper-button-next",
        }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
          767: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
        }}
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard pro={{ id: product._id }} className="popularcard" />
            {/* <Card className="popularcard">
              <Link to={`/product/${product._id}`} className="cardLink">
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                />
              </Link>
              <CardContent className="cardContent">
                <Link to={`/product/${product._id}`} className="productName">
                  <Typography variant="h5">{product.name}</Typography>
                </Link>
                <Typography variant="body1">
                  Price: {product.price} $
                </Typography>
                <RatingComponent product={product} products={products} />
                {/* Category */}
            {/* <Typography variant="body1">
                  Category:
                  <Typography
                    variant="h6"
                    component="span"
                    style={{ marginLeft: "5px" }}
                  >
                    {product.category ? product.category.name : "No category"}
                  </Typography>
                </Typography> */}
            {/* 
                {!isCart && !isAdmin && (
                  <div className="icons-block">
                    <IconButton onClick={() => handleOpenModal(product._id)}>
                      <VisibilityIcon />
                    </IconButton>
                    {!isCart && !isAdmin && <AddToCart product={product} />}
                  </div>
                )} */}
            {/* {isAdmin && (
                  <div className="icons-block">
                    <IconButton onClick={() => onEdit(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="delete"
                      onClick={() => handlerProductDelite(product)}
                    >
                      <DeleteForeverIcon className="deliteCard" />
                    </IconButton>
                  </div>
                )} */}
            {/* </CardContent> */}
            {/* </Card> */}
          </SwiperSlide>
        ))}
      </Swiper>
      <Button className="swiper-button-prev"></Button>
      <Button className="swiper-button-next"></Button>
    </div>
  );
}

export default Popular;
