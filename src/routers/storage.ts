import { Router } from "express";
import { getFormProduct, getProduct } from "../controllers/products";

const router = Router()

router.get('/products', getProduct)
router.get('/get-form-products', getFormProduct)

export default router