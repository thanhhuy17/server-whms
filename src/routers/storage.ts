import { Router } from "express";
import { getProduct } from "../controllers/products";

const router = Router()
router.get('/', getProduct)

export default router