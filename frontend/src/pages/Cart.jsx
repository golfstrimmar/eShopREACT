import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, List, ListItem, ListItemText, Divider, Typography,CardMedia } from '@mui/material';

// Действия для работы с корзиной
const removeFromCart = (productId) => ({ type: 'REMOVE_FROM_CART', payload: productId });
const clearCart = () => ({ type: 'CLEAR_CART' });

const Cart = () => {
  const cartItems = useSelector((state) => state.cart); // Получаем товары из корзины
  const dispatch = useDispatch(); // Подключаем dispatch

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId)); // Удаляем товар из корзины
  };
  
  const handleClearCart = () => {
    dispatch(clearCart()); // Очищаем корзину
  };
  
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0); // Рассчитываем общую цену
  
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>
      <List>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ListItem key={item.id}>
              <CardMedia
                component="img"
                image={item.image} // Используем путь к изображению товара
                alt={item.name}
                style={{ width: 150, height: 150, marginRight: 10 }}
              />
              <ListItemText primary={item.name} secondary={`Цена: ${item.price} руб.`} />
              <Button variant="outlined" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>
                Удалить
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">Корзина пуста</Typography>
        )}
      </List>
      <Divider />
      {cartItems.length > 0 && (
        <>
          <Typography variant="h6" style={{ marginTop: 10 }}>
            Общая сумма: {totalPrice} руб.
          </Typography>
          <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
            Оформить заказ
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClearCart} style={{ marginLeft: 10 }}>
            Очистить корзину
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
