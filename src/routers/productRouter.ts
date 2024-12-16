import { Router } from "express";
import { addNewCategory, addNewProduct, deleteCategory, deleteProduct, getCategories, getCategoryDetail, getFormAddNewProduct, getFormProduct, getProduct, getProductForExport, updateCategory, updateProduct } from "../controllers/products";


const router = Router();
//---------------- PRODUCT -----------------
router.get('/', getProduct)
router.post('/add-new-product', addNewProduct)
router.put('/update-product', updateProduct)
router.delete('/delete-product', deleteProduct)
router.get('/get-form-product', getFormProduct)
router.get('/get-form-add-new-product', getFormAddNewProduct)
router.post('/get-export-data-product', getProductForExport)
//---------------- CATEGORY -----------------
router.post('/category-add-new', addNewCategory)
router.get('/get-categories', getCategories)
router.get('/categories/detail', getCategoryDetail)
router.put('/update-category', updateCategory)
router.delete('/delete-category', deleteCategory)
export default router