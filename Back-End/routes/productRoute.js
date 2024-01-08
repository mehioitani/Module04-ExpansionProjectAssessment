import express from "express";
import * as productController from "../controllers/productController.js"
import Protect from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/product/:id", Protect, productController.getAllProducts);
router.get("/product/:id", Protect, productController.getOneProduct);
router.post("/product", Protect, productController.createProduct);
router.put("/product/:id", Protect, productController.updateProduct);
router.delete("/product/:id", Protect, productController.deleteProduct);

export default router;
