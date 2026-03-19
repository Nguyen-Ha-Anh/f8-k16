import express from "express";
import { productController } from "../controllers/product.controller";

const router = express.Router();

router.get("/", productController.index);
router.get("/:id", productController.find)
router.post("/", productController.create);
router.put('/:id', productController.update)
router.patch('/:id', productController.update)
router.delete('/:id', productController.delete)

export default router;