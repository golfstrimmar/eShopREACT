import Product from "../models/Product.js";
import cloudinary from "../config/cloudinaryConfig.js";
export const addProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      image,
    });

    await newProduct.save(); // Сохраняем товар в базе
    res.status(201).json(newProduct); // Возвращаем добавленный товар
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error });
  }
};

export const deliteProduct = async (req, res) => {
  console.log("Product to delete---", req.body._id);

  const extractPublicId = (url) => {
    const parts = url.split("/");
    const versionIndex = parts.findIndex((part) => part.startsWith("v"));
    return parts
      .slice(versionIndex + 1)
      .join("/")
      .replace(/\.[^/.]+$/, "");
  };

  const publicId = extractPublicId(req.body.image);

  try {
    await cloudinary.uploader.destroy(publicId);
    console.log(`Image ${publicId} deleted from Cloudinary`);
  } catch (err) {
    console.error("Failed to delete image from Cloudinary:", err.message);
    return res
      .status(500)
      .json({ message: "Failed to delete image from Cloudinary" });
  }

  try {
    await Product.findByIdAndDelete(req.body._id);
    console.log(`Product ${req.body._id} deleted from database`);
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Получаем все товары
    res.status(200).json(products); // Возвращаем товары
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
