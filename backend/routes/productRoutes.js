import express from "express";
import {
  addProduct,
  getProducts,
  deliteProduct,
  updateProductCategory,
  rateProduct,
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getProducts);
router.post("/add", addProduct);
router.post("/delite", deliteProduct);
router.put("/:productId/updateCategory", updateProductCategory);
router.post("/rate", rateProduct);
export default router;
