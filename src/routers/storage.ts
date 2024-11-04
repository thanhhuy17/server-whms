import { Router } from "express";
import { addNewProduct, getFormProduct, getProduct } from "../controllers/products";

const router = Router()

router.get('/', getProduct)
router.post('/add-new-product', addNewProduct)
router.get('/get-form-product', getFormProduct)

export default router