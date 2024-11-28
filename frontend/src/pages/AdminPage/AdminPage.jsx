import React, { useState } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import ProductList from "../../components/ProductList/ProductList";
import AddProductForm from "../../components/AddProductForm";
import CategoryesList from "../../components/CategoryesList/CategoryesList";
import "./AdminPage.scss";
const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState("products");
  const [productToEdit, setProductToEdit] = useState(null);

  // --------------------------

  // --------------------------
  const handlerSelectedTab = (e, data) => {
    setSelectedTab(data);
  };

  // --------------------------

  // --------------------------
  const handleProductEdit = (product) => {
    setProductToEdit(product);
    setSelectedTab("addProduct");
  };
  // --------------------------

  // --------------------------
  return (
    <div className="admin">
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
        {selectedTab === "products" && (
          <ProductList onEdit={handleProductEdit} />
        )}
        {selectedTab === "addProduct" && (
          <AddProductForm
            productToEdit={productToEdit}
            setProductToEdit={setProductToEdit}
          />
        )}
        {selectedTab === "categories" && <CategoryesList />}
      </div>
    </div>
  );
};

export default AdminPage;
