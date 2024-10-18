import { Router } from "express";
import { addNewSupplier, deleteSupplier, getSuppliers, updateSupplier } from "../controllers/supplier";

const router = Router()

router.get('/', getSuppliers) // get All cho phep frontend lay du lieu
router.post('/add-new-supplier', addNewSupplier) // dua du lieu tu frontend len
router.put('/update-supplier', updateSupplier) // update data Supplier
router.delete('/delete-supplier', deleteSupplier) // update data Supplier

export default router