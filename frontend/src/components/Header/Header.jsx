import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import "./Header.scss";
const Header = () => {
  const [numberProducts, setNumberProducts] = useState(0);
  const [actPoint, setActPoint] = useState("Home");

  let temp = useSelector((state) => state.cart);
  const dispatchCart = () => {
    setNumberProducts(temp.length);
  };
  useEffect(() => {
    dispatchCart();
  }, [temp]);

  const handlerActPoint = (arg) => {
    setActPoint(arg);
  };
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Магазин
        </Typography>
        {/* Навигация с использованием Link для перехода по страницам */}
        <Button
          color="inherit"
          component={Link}
          to="/"
          onClick={(e) => {
            handlerActPoint("Home");
          }}
          style={{ color: actPoint === "Home" ? "red" : "" }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/login"
          onClick={(e) => {
            handlerActPoint("Login");
          }}
          style={{ color: actPoint === "Login" ? "red" : "" }}
        >
          Login
        </Button>
        <Box
          className="cart-icon"
          component={Link}
          to="/cart"
          onClick={(e) => {
            handlerActPoint("Card");
          }}
          style={{ color: actPoint === "Card" ? "red" : "" }}
        >
          <div>
            <ShoppingCartIcon />
          </div>
          <span className="cart-badge">{numberProducts}</span>
        </Box>
        <Button
          color="inherit"
          component={Link}
          to="/admin"
          onClick={(e) => {
            handlerActPoint("admin");
          }}
          style={{ color: actPoint === "admin" ? "red" : "" }}
        >
          admin
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
