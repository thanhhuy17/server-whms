import { Router } from "express";
import { addNewSupplier, deleteSupplier, getFormSupplier, getSuppliers, updateSupplier } from "../controllers/supplier";

const router = Router()

router.get('/', getSuppliers) // get All cho phep frontend lay du lieu
router.post('/add-new-supplier', addNewSupplier) // dua du lieu tu frontend len
router.put('/update-supplier', updateSupplier) // update data Supplier
router.delete('/delete-supplier', deleteSupplier) // Delete data Supplier
// Get Form Supplier API
router.get(`/get-form-supplier`,getFormSupplier)

export default router