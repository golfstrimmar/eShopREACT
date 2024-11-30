import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import multer from "multer";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/auth.js";
// --------------------------------------------------
const upload = multer();
dotenv.config();
connectDB();
const app = express();

console.log(process.env.PORT);
console.log(process.env.MONGO_URI);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(
    `Incoming request:  method=${req.method} url=${req.url}   body=${
      req.body
    }    body=${JSON.stringify(req.body, null, 2)}`
  );
  next();
});

// ====================================
app.use(
  "/products",
  upload.none(),
  (req, res, next) => {
    console.log("Body content:", req.body);
    next();
  },
  productRoutes
);
// ====================================
app.use("/categories", upload.none(), categoryRoutes);
// ====================================
app.use("/auth", upload.none(), authRoutes);
// ====================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
