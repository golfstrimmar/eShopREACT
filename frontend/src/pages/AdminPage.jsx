import React from "react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import ProductList from "../components/ProductList/ProductList";
import AddProductForm from "../components/AddProductForm";

const AdminPage = () => {
  return (
    <div className="pageContent">
      <Typography variant="h4" gutterBottom>
        Админпанель
      </Typography>
      <Box>
        <Typography variant="h6" gutterBottom>
          Список товаров
        </Typography>
        <ProductList />
      </Box>

      {/* Форма добавления товаров */}
      <Grid item xs={12} marginTop={3}>
        <Paper elevation={3}>
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Добавить товар
            </Typography>
            <AddProductForm />
          </Box>
        </Paper>
      </Grid>
    </div>
  );
};

export default AdminPage;
