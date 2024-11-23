import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Импортируем Link из react-router-dom

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Магазин
      </Typography>
      {/* Навигация с использованием Link для перехода по страницам */}
      <Button color="inherit" component={Link} to="/">Главная</Button>
      <Button color="inherit" component={Link} to="/cart">Корзина</Button>
      <Button color="inherit" component={Link} to="/login">Войти</Button>
    </Toolbar>
  </AppBar>
);

export default Header;

