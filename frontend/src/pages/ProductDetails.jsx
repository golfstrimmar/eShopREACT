// src/pages/ProductDetails/ProductDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';



const ProductDetails = () => {
  const { id } = useParams(); // Получаем id товара из маршрута
  const dispatch = useDispatch();
  // Достаем товары из Redux store
  const products = useSelector((state) => state.products);
  // Находим товар по id
  const product = products.find((item) => item.id === Number(id));
  
  // Если товар не найден
  if (!product) {
    return <Typography variant="h6">Товар не найден</Typography>;
  }
  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Добавляем товар в корзину
  };
  return (
    <div>
      <Card style={{ display: 'flex' }}>
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body1">Цена: {product.price} руб.</Typography>
          <Typography variant="body2">{product.description}</Typography>
          <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={handleAddToCart}>
            Добавить в корзину
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
