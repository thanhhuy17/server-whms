import { Router } from "express";
import { addNewProduct, deleteProduct, getFormProduct, getProduct, updateProduct } from "../controllers/products";

const router = Router()

router.get('/', getProduct)
router.post('/add-new-product', addNewProduct)
router.put('/update-product', updateProduct)
router.delete('/delete-product', deleteProduct)
router.get('/get-form-product', getFormProduct)
export default router