import express from "express";
import Category from "../models/Category.js"; // Модель категории
const router = express.Router();

// Запрос на создание категории
router.post("/", async (req, res) => {
  const { name } = req.body; // Получаем название категории из запроса

  try {
    // Проверяем, существует ли категория с таким названием
    let category = await Category.findOne({ name });

    if (!category) {
      // Если категория не найдена, создаем новую
      category = new Category({ name });
      await category.save(); // Сохраняем категорию в базе
    }

    // Отправляем категорию с ее данными (можно отправить только ID или имя)
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create category" });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// Запрос на редактирование категории
router.put("/:id", async (req, res) => {
  const { id } = req.params; // Получаем ID категории из параметров запроса
  const { name } = req.body; // Получаем новое имя категории из тела запроса

  try {
    // Ищем категорию по ID
    let category = await Category.findById(id);

    if (!category) {
      // Если категория не найдена, отправляем ошибку
      return res.status(404).json({ message: "Category not found" });
    }

    // Обновляем имя категории
    category.name = name;

    // Сохраняем обновленную категорию в базе данных
    await category.save();

    // Отправляем обновленные данные категории
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update category" });
  }
});

// Запрос на удаление категории
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
});

export default router;
