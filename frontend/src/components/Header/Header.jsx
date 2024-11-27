import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import "./Header.scss";
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
          Home
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Box className="cart-icon" component={Link} to="/cart">
          <div>
            <ShoppingCartIcon />
          </div>
          <span className="cart-badge">{numberProducts}</span>
        </Box>
        <Button color="inherit" component={Link} to="/admin">
          admin
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
