import express from "express";
import * as categoryController from "../controllers/categoryController.js";
import Protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/category", Protect, categoryController.getAllCategories);
router.get("/category/:id", Protect, categoryController.getOneCategory);
router.post("/category", Protect, categoryController.createCategory);
router.put("/category/:id", Protect, categoryController.updateCategory);
router.delete("/category/:id", Protect, categoryController.deleteCategory);

export default router;
