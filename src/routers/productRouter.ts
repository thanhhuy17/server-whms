import { Router } from "express";
import { addNewCategory, addNewProduct, deleteProduct, getFormAddNewProduct, getFormProduct, getProduct, getProductForExport, updateProduct } from "../controllers/products";


const router  = Router();

router.get('/', getProduct)
router.post('/add-new-product', addNewProduct)
router.put('/update-product', updateProduct)
router.delete('/delete-product', deleteProduct)
router.get('/get-form-product', getFormProduct)
router.get('/get-form-add-new-product', getFormAddNewProduct)
router.post('/get-export-data-product', getProductForExport)
//------------------------------------------
router.post('/category-add-new',addNewCategory)
export default router