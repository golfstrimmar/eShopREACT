import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Header.scss";
import { setUser } from "../../redux/actions/authActions";
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Получаем пользователя из Redux
  const isAuthenticated = user !== null; // Если пользователь есть, то он авторизован
  const [numberProducts, setNumberProducts] = useState(0);
  const [actPoint, setActPoint] = useState("Home");

  let temp = useSelector((state) => state.cart);
  const dispatchCart = () => {
    setNumberProducts(temp.length);
  };
  useEffect(() => {
    dispatchCart();
  }, [temp]);
  // ---------------------------------------
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const userData = localStorage.getItem("user"); // Получаем данные пользователя из localStorage
  //   if (userData) {
  //     setUser(JSON.parse(userData)); // Преобразуем строку обратно в объект
  //     setIsAuthenticated(true); // Устанавливаем флаг аутентификации в true
  //   } else {
  //     setIsAuthenticated(false); // Если данных нет, считаем, что пользователь не авторизован
  //   }
  // }, []);
  // ------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUser(null, null)); // Очищаем данные пользователя в Redux
  };
  // ------------------------------------
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

        {!isAuthenticated ? (
          <>
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
            <Button
              color="inherit"
              component={Link}
              to="/register"
              onClick={(e) => {
                handlerActPoint("Register");
              }}
              style={{ color: actPoint === "Register" ? "red" : "" }}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <div>
              <Button
                color="inherit"
                component={Link}
                to="/profile"
                onClick={(e) => {
                  handlerActPoint("Profile");
                }}
                style={{ color: actPoint === "Profile" ? "red" : "" }}
              >
                Hello, <h3>{user ? user.name : "User"}</h3>, see Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        )}

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
