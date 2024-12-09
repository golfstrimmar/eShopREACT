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
          1500: {
            slidesPerView: 3,
          },
          970: {
            slidesPerView: 2,
          },
        }}
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard pro={{ id: product._id }} className="popularcard" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Button className="swiper-button-prev"></Button>
      <Button className="swiper-button-next"></Button>
    </div>
  );
}

export default Popular;
