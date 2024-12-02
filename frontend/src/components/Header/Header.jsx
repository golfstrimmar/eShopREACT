import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Header.scss";
import { setUser } from "../../redux/actions/authActions";
import { clearCart } from "../../redux/actions/cartActions";
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = user !== null;
  const [numberProducts, setNumberProducts] = useState(0);
  const [actPoint, setActPoint] = useState("");
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  // ------------------------------
  let temp = useSelector((state) => state.cart);
  const dispatchCart = () => {
    setNumberProducts(temp.length);
  };
  useEffect(() => {
    dispatchCart();
  }, [temp]);
  // ---------------------------------------

  // ------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUser(null, null));
    dispatch(clearCart());
  };
  // ------------------------------------

  useEffect(() => {
    if (user && user.name === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);
  // ------------------------------------

  useEffect(() => {
    const path = location.pathname.split("/")[1] || "home";
    setActPoint(path);
  }, [location]);
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
            handlerActPoint("home");
          }}
          style={{ color: actPoint === "home" ? "red" : "" }}
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
                handlerActPoint("login");
              }}
              style={{ color: actPoint === "login" ? "red" : "" }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
              onClick={(e) => {
                handlerActPoint("register");
              }}
              style={{ color: actPoint === "register" ? "red" : "" }}
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
                  handlerActPoint("profile");
                }}
                style={{ color: actPoint === "profile" ? "red" : "" }}
              >
                Hello, <h3>{user ? user.name : "user"}</h3>, see Profile
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
            handlerActPoint("card");
          }}
          style={{ color: actPoint === "card" ? "red" : "" }}
        >
          <div>
            <ShoppingCartIcon />
          </div>
          <span className="cart-badge">{numberProducts}</span>
        </Box>
        {isAdmin && (
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
