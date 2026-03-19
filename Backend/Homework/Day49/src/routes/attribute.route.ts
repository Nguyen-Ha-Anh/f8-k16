import express from "express";
import { attributeController } from "../controllers/attribute.controller";

const router = express.Router();

router.get('/', attributeController.index)
router.get('/:id', attributeController.find)
router.post('/', attributeController.create)
router.put('/:id', attributeController.update)
router.delete('/:id', attributeController.delete)
router.post('/:id/values', attributeController.createValue)
router.delete('/:id/values/:valueId', attributeController.deleteValue)

export default router