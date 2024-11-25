import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const Header = () => {
  const [numberProducts, setNumberProducts] = useState(0);
  let temp = useSelector((state) => state.cart);
  const dispatchCart = () => {
    setNumberProducts(temp.length);
  };
  useEffect(() => {
    dispatchCart();
  }, [temp]);

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Магазин
        </Typography>
        {/* Навигация с использованием Link для перехода по страницам */}
        <Button color="inherit" component={Link} to="/">
          Главная
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Корзина
          <span className="cart-badge">{numberProducts}</span>
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Войти
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          admin
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
