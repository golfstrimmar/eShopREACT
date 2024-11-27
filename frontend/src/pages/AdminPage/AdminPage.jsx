import React, { useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ProductList from "../../components/ProductList/ProductList";
import AddProductForm from "../../components/AddProductForm";
import CategoryesList from "../../components/CategoryesList/CategoryesList";
import "./AdminPage.scss";
const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState("products"); // Текущая вкладка
  // const [drawerOpen, setDrawerOpen] = useState(false);
  // const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handlerSelectedTab = (e, data) => {
    setSelectedTab(data);
  };
  return (
    <div className="admin">
      {/* <Button variant="contained" color="primary" onClick={toggleDrawer}>
        Open Menu
      </Button> */}
      <div anchor="left" className="adminMenu">
        <Typography variant="h4" marginTop={2}>
          Admin Panel
        </Typography>
        <List>
          <ListItem
            button
            onClick={(e) => {
              handlerSelectedTab(e, "products");
            }}
            style={{
              backgroundColor:
                selectedTab === "products" ? "rgba(0, 0, 0, 0.05)" : "",
            }}
          >
            <ListItemText primary="Product List" />
          </ListItem>

          <ListItem
            button
            onClick={(e) => {
              handlerSelectedTab(e, "addProduct");
            }}
            style={{
              backgroundColor:
                selectedTab === "addProduct" ? "rgba(0, 0, 0, 0.05)" : "",
            }}
          >
            <ListItemText primary="Add Product" />
          </ListItem>
          <ListItem
            button
            onClick={(e) => {
              handlerSelectedTab(e, "categories");
            }}
            style={{
              backgroundColor:
                selectedTab === "categories" ? "rgba(0, 0, 0, 0.05)" : "",
            }}
          >
            <ListItemText primary="Categories" />
          </ListItem>
        </List>
      </div>
      <div className="content">
        {selectedTab === "products" && <ProductList />}
        {selectedTab === "addProduct" && <AddProductForm />}
        {selectedTab === "categories" && <CategoryesList />}
      </div>
      {/* <Typography variant="h4" gutterBottom>
        Админпанель
      </Typography> */}
      {/* <Box>
        <Typography variant="h6" gutterBottom>
          Список товаров
        </Typography>
        <ProductList />
      </Box> */}

      {/* Форма добавления товаров */}
      {/* <Grid item xs={12} marginTop={3}>
        <Paper elevation={3}>
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Добавить товар
            </Typography>
            <AddProductForm />
          </Box>
        </Paper>
      </Grid> */}
    </div>
  );
};

export default AdminPage;
