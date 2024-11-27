import Product from "../models/Product.js";
import cloudinary from "../config/cloudinaryConfig.js";
import Category from "../models/Category.js";
// ------------------------------------
export const addProduct = async (req, res) => {
  const { name, price, description, image, category } = req.body;

  try {
    const categoryDocument = await Category.findById(category);

    if (!categoryDocument) {
      return res.status(400).json({ message: "Category not found" });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      image,
      category: categoryDocument._id,
    });

    await newProduct.save();

    const populatedProduct = await Product.findById(newProduct._id).populate(
      "category"
    );
    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error });
  }
};
// -------------------------------
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
// ----------------------------------------
export const getProducts = async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  try {
    const filter = {};

    if (minPrice && !isNaN(minPrice)) {
      filter.price = { $gte: Number(minPrice) };
    }
    if (maxPrice && !isNaN(maxPrice)) {
      if (!filter.price) {
        filter.price = {};
      }
      filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter).populate({
      path: "category",
      select: "name",
      options: { strictPopulate: false },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error });
  }
};
// ------------------------
export const updateProductCategory = async (req, res) => {
  const { productId } = req.params;
  const { category } = req.body; // Новый ID категории

  try {
    // Находим продукт по ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Проверяем, существует ли категория
    const categoryDocument = await Category.findById(category);
    if (!categoryDocument) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Обновляем категорию продукта
    product.category = categoryDocument._id;
    await product.save();

    // Возвращаем обновленный продукт с популированной категорией
    const populatedProduct = await Product.findById(product._id).populate(
      "category"
    );
    res.status(200).json(populatedProduct);
  } catch (error) {
    console.error("Error updating product category:", error);
    res.status(500).json({ message: "Error updating product category", error });
  }
};
// ---------------------------
const roundToHalf = (num) => {
  return Math.round(num * 2) / 2;
};
export const rateProduct = async (req, res) => {
  const { productId, rating } = req.body;

  if (rating < 0.5 || rating > 5) {
    return res
      .status(400)
      .json({ message: "Rating must be between 0.5 and 5" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const newAverageRating = (product.rating + rating) / 2;
    const roundedRating = roundToHalf(newAverageRating);
    product.rating = roundedRating;
    await product.save();
    res.status(200).json({ message: "Rating updated", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update rating" });
  }
};
