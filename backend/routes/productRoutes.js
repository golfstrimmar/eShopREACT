import express from "express";
import {
  addProduct,
  getProducts,
  deliteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct);
router.post("/delite", deliteProduct);
router.get("/", getProducts);

export default router;
