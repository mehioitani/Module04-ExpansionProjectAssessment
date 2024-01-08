import express from "express";
import * as supplierController from "../controllers/supplierController.js";
import Protect from "../middleware/authMiddleware.js";
const router = express.Router();



router.post("/register", supplierController.registerSupplier);
router.post("/login", supplierController.loginSupplier);
router.get("/me", Protect,supplierController.getSupplier);

export default router;
