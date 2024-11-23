import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  // Извлекаем товары из хранилища Redux
  const products = useSelector((state) => state.products);
  
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Наши товары
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <Card key={product.id} style={{ margin: 10, width: 200 }}>
            <CardMedia component="img" height="140" image={product.image} alt={product.name} />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">Цена: {product.price} руб.</Typography>
              <Link to={`/product/${product.id}`}>
                <Button variant="outlined" color="primary">Подробнее</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
