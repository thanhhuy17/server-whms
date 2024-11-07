import { Router } from "express";
import { addNewSupplier, deleteSupplier, getFormSupplier, getSuppliers, getSuppliersForExport, updateSupplier } from "../controllers/supplier";

const router = Router()
// Get All cho phep frontend lay du lieu
router.get('/', getSuppliers)
// Dua du lieu tu frontend len
router.post('/add-new-supplier', addNewSupplier)
// Update data Supplier
router.put('/update-supplier', updateSupplier)
// Delete data Supplier
router.delete('/delete-supplier', deleteSupplier)
// Get Form Supplier API
router.get(`/get-form-supplier`, getFormSupplier)
// Đưa dữ liệu ngày tháng từ frontend lên
router.post(`/get-export-data`, getSuppliersForExport)
export default router