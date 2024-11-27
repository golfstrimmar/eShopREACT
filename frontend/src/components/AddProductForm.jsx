import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Input,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import axios from "axios";
import useProducts from "../hooks/useProducts";
// ===============================================
const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useProducts();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (isSubmitting) {
      setSuccessMessage("The product has been added successfully.");
      setLoading(false);
      setTimeout(() => {
        setName("");
        setPrice("");
        setCategoryName("");
        setDescription("");
        setImage(null);
        setImagePreview(null);
        setSuccessMessage("");
      }, 1000);
    }
  }, [isSubmitting]);

  // --------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  // ----------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !image || !categoryName.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage("");
      setIsSubmitting(false);
      // -----------------
      const categoryResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/categories`,
        { name: categoryName.trim() }
      );
      let category = categoryResponse.data;
      // ----------------------
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category._id);
      formData.append("description", description);
      // --------------------
      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("file", image);
        imageFormData.append("upload_preset", "blogblog");
        imageFormData.append("cloud_name", "dke0nudcz");

        const imageResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dke0nudcz/image/upload",
          imageFormData
        );
        const imageUrl = imageResponse.data.secure_url;
        formData.append("image", imageUrl);
      }
      // --------------------
      // try {
      //   setLoading(true);
      //   setErrorMessage("");
      //   setIsSubmitting(false);

      //   const formData = new FormData();
      //   formData.append("name", name);
      //   formData.append("price", price);
      //   formData.append("category", category._id);
      //   formData.append("description", description);

      //   if (image) {
      //     const imageFormData = new FormData();
      //     imageFormData.append("file", image);
      //     imageFormData.append("upload_preset", "blogblog");
      //     imageFormData.append("cloud_name", "dke0nudcz");
      //     const imageResponse = await axios.post(
      //       "https://api.cloudinary.com/v1_1/dke0nudcz/image/upload",
      //       imageFormData
      //     );
      //     const imageUrl = imageResponse.data.secure_url;
      //     formData.append("image", imageUrl);
      //   }

      //   const response = await axios.post(
      //     `${process.env.REACT_APP_API_URL}/products/add`,
      //     formData
      //   );
      //   dispatch(setProducts([...products, response.data]));
      //   setIsSubmitting(true);
      //   setSuccessMessage("The product has been added successfully.");
      // } catch (error) {
      //   setLoading(false);
      //   console.error("Error adding product:", error);
      //   setErrorMessage("Failed to add product. Please try again.", error);
      // } finally {
      //   setLoading(false);
      // }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/products/add`,
        formData
      );
      dispatch(setProducts([...products, response.data]));
      setIsSubmitting(true);
      setSuccessMessage("Продукт был успешно добавлен.");
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
      setErrorMessage(
        "Не удалось добавить продукт. Пожалуйста, попробуйте снова."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        label="Product name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Product price"
        type="number"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
      />
      {/* Текстовое поле для ввода категории */}
      <TextField
        label="Product Category"
        fullWidth
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Product description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      {/* Кастомизированное поле для загрузки изображения */}
      <label htmlFor="image-upload">
        <Button
          variant="outlined"
          component="span"
          sx={{ width: "100%", marginBottom: 2 }}
        >
          {image ? "Image Selected" : "Choose Image"}
        </Button>
      </label>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        sx={{ visibility: "hidden", position: "absolute" }}
      />
      {imagePreview && (
        <Box sx={{ marginBottom: 2, textAlign: "center" }}>
          <img
            src={imagePreview}
            alt="Image preview"
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </Box>
      )}
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {successMessage && (
        <Typography color="success">{successMessage}</Typography>
      )}
      {loading && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
      <Button variant="contained" color="primary" type="submit">
        Add Product
      </Button>
    </Box>
  );
};

export default AddProductForm;
