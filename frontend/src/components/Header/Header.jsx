import React, { useState, useEffect } from "react";
import { ReactComponent as Rt } from "../../assets/react.svg";
import { ReactComponent as No } from "../../assets/nodejs.svg";
import { ReactComponent as Ex } from "../../assets/express.svg";
import { ReactComponent as Md } from "../../assets/mongodb.svg";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Container,
  Avatar,
  Divider,
  CardMedia,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import SecurityIcon from "@mui/icons-material/Security";
import { useSelector, useDispatch } from "react-redux";
import "./Header.scss";
import { setUser } from "../../redux/actions/authActions";
import { clearCart } from "../../redux/actions/cartActions";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
// ============================================
const Header = () => {
  const [anchorAvatarEl, setAnchorAvatarEl] = useState(null);
  const [anchormobEl, setAnchormobEl] = useState(null);
  const [menuAvatarOpen, setMenuAvatarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [actPoint, setActPoint] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [numberProducts, setNumberProducts] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============================
  const imageUrl = user?.picture
    ? `${process.env.REACT_APP_API_URL}${user.picture}` // Добавляем путь к серверу
    : null;
  // =====================================
  const handlerActPoint = (arg) => {
    setActPoint(arg);
  };
  // =====================================
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // =====================================
  let temp = useSelector((state) => state.cart);

  useEffect(() => {
    setNumberProducts(temp.length);
  }, [temp]);
  // =====================================
  useEffect(() => {
    if (user) {
      setMenuAvatarOpen(false);
    }
    if (user && user.name === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);
  // =====================================
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUser(null, null));
    dispatch(clearCart());
    navigate("/login");
  };
  // ==========================================
  // Открытие меню для профиля
  const handleOpenAvatar = (event) => {
    setAnchorAvatarEl(event.currentTarget);
    setMenuAvatarOpen(true);
  };

  // Закрытие меню
  const handleClose = () => {
    setAnchorAvatarEl(null);
    setMenuAvatarOpen(false);
  };
  // ==================================
  // Открытие меню на мобильных устройствах
  const handleOpenMenu = (event) => {
    setAnchormobEl(event.currentTarget);
    setMenuOpen(true);
  };
  // Закрытие меню
  const handleCloseMenu = () => {
    setAnchormobEl(null);
    setMenuOpen(false);
  };

  // ==================================

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: scrollY > 50 ? "#033362D3" : "rgb(3,51,98)",
        transition: "background-color 0.3s ease",
        boxShadow: scrollY > 50 ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
      }}
      className="header"
    >
      <Container maxWidth="xl">
        <Toolbar>
          {/* Логотип  */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="logo">
            <Link to="/">
              <Rt></Rt>
              <No></No>
              <Ex></Ex>
              <Md></Md>
            </Link>
          </Typography>

          {/* Добавляем отображение имени пользователя рядом с иконкой меню на мобильных */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "left" }}>
            {user ? (
              <>
                <IconButton
                  onClick={handleOpenAvatar}
                  size="small"
                  sx={{ ml: 2 }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.picture ? (
                      <CardMedia
                        component="img"
                        image={imageUrl}
                        alt="img"
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          m: 2,
                        }}
                      />
                    ) : (
                      <p>A</p>
                    )}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorAvatarEl}
                  id="account-menu"
                  open={menuAvatarOpen}
                  onClose={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {user ? (
                    <div>
                      <MenuItem
                        color="inherit"
                        component={Link}
                        to="/profile"
                        onClose={handleClose}
                      >
                        <Avatar />
                        See profile
                      </MenuItem>
                      <Divider />
                      <MenuItem color="inherit" onClick={handleLogout}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </div>
                  ) : (
                    <div>
                      <MenuItem
                        component={Link}
                        to="/login"
                        onClick={(e) => {
                          handlerActPoint("login");
                        }}
                        style={{
                          color: actPoint === "login" ? "red" : "inherit",
                        }}
                      >
                        <LoginIcon
                          style={{ marginRight: "8px", color: "inherit" }}
                        />
                        Login
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/register"
                        onClick={(e) => {
                          handlerActPoint("register");
                        }}
                        style={{
                          color: actPoint === "register" ? "red" : "inherit",
                        }}
                      >
                        <AppRegistrationIcon
                          style={{ marginRight: "8px", color: "inherit" }}
                        />
                        Registration
                      </MenuItem>
                    </div>
                  )}
                </Menu>
              </>
            ) : (
              <div></div>
            )}
          </Box>

          {/* Меню для мобильных */}
          {/* Меню для мобильных */}
          {/* Меню для мобильных */}
          {/* Меню для мобильных */}
          {/* Меню для мобильных */}
          {/* Меню для мобильных */}
          {/* Меню для мобильных */}

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleOpenMenu}
              sx={{ marginLeft: "auto", cursor: "pointer" }}
            >
              <MenuIcon sx={{ marginLeft: "auto", cursor: "pointer" }} />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchormobEl}
            open={menuOpen}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              component={Link}
              to="/"
              onClick={(e) => {
                handlerActPoint("home");
                handleCloseMenu();
              }}
              style={{ color: actPoint === "home" ? "red" : "inherit" }}
            >
              <HomeIcon style={{ marginRight: "8px", color: "inherit" }} /> Home
            </MenuItem>

            {isAdmin && (
              <MenuItem
                color="inherit"
                component={Link}
                to="/admin"
                onClick={(e) => {
                  handlerActPoint("admin");
                }}
                style={{ color: actPoint === "admin" ? "red" : "inherit" }}
              >
                <SecurityIcon sx={{ mr: 1 }} /> Admin
              </MenuItem>
            )}
            <Box
              className="cart-icon"
              component={Link}
              to="/cart"
              onClick={(e) => {
                handlerActPoint("card");
              }}
              style={{
                color: actPoint === "card" ? "red" : "inherit",
                position: "relative",
                margin: "15px 0 15px 16px",
              }}
            >
              <ShoppingCartIcon sx={{ mr: 1 }} />
              <span className="cart-badge">{numberProducts}</span>
            </Box>
            {!user && (
              <div>
                <MenuItem
                  component={Link}
                  to="/login"
                  onClick={(e) => {
                    handlerActPoint("login");
                  }}
                  style={{ color: actPoint === "login" ? "red" : "inherit" }}
                >
                  <LoginIcon style={{ marginRight: "8px", color: "inherit" }} />
                  Login
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/register"
                  onClick={(e) => {
                    handlerActPoint("register");
                  }}
                  style={{ color: actPoint === "register" ? "red" : "inherit" }}
                >
                  <AppRegistrationIcon
                    style={{ marginRight: "8px", color: "inherit" }}
                  />
                  Registration
                </MenuItem>
              </div>
            )}
          </Menu>

          {/* Меню для больших экранов */}
          {/* Меню для больших экранов */}
          {/* Меню для больших экранов */}
          {/* Меню для больших экранов */}
          {/* Меню для больших экранов */}
          {/* Меню для больших экранов */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              msFlexDirection: "column",
              alignItems: "center",
            }}
          >
            <MenuItem
              component={Link}
              to="/"
              onClick={(e) => {
                handlerActPoint("home");
              }}
              style={{ color: actPoint === "home" ? "red" : "white" }}
            >
              <HomeIcon sx={{ mr: 1 }} /> Home
            </MenuItem>

            {!user ? (
              <>
                <MenuItem
                  component={Link}
                  to="/login"
                  onClick={(e) => {
                    handlerActPoint("login");
                  }}
                  style={{ color: actPoint === "login" ? "red" : "white" }}
                >
                  <LoginIcon sx={{ mr: 1 }} />
                  Login
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/register"
                  onClick={(e) => {
                    handlerActPoint("register");
                  }}
                  style={{ color: actPoint === "register" ? "red" : "white" }}
                >
                  <AppRegistrationIcon sx={{ mr: 1 }} />
                  Registration
                </MenuItem>
              </>
            ) : (
              <>
                <IconButton
                  onClick={handleOpenAvatar}
                  size="small"
                  sx={{ ml: 1, mr: 1 }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.picture ? (
                      <CardMedia
                        component="img"
                        image={imageUrl}
                        alt="img"
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          m: 2,
                        }}
                      />
                    ) : (
                      <p>A</p>
                    )}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorAvatarEl}
                  id="account-menu"
                  open={menuAvatarOpen}
                  onClose={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    color="inherit"
                    component={Link}
                    to="/profile"
                    onClose={handleClose}
                  >
                    <Avatar />
                    See profile
                  </MenuItem>
                  <Divider />
                  <MenuItem color="inherit" onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
            <Box
              className="cart-icon"
              component={Link}
              to="/cart"
              onClick={(e) => {
                handlerActPoint("card");
              }}
              style={{ color: actPoint === "card" ? "red" : "white" }}
            >
              <div>
                <ShoppingCartIcon sx={{ mr: 1 }} />
              </div>
              <span className="cart-badge">{numberProducts}</span>
            </Box>
            {isAdmin && (
              <MenuItem
                color="inherit"
                component={Link}
                to="/admin"
                onClick={(e) => {
                  handlerActPoint("admin");
                }}
                style={{ color: actPoint === "admin" ? "red" : "white" }}
              >
                <SecurityIcon sx={{ mr: 1 }} /> Admin
              </MenuItem>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
