import { Router } from "express";
import { addNewSupplier, getSuppliers } from "../controllers/supplier";

const router = Router()

router.get('/', getSuppliers) // get All cho phep frontend lay du lieu
router.post('/add-new-supplier', addNewSupplier) // dua du lieu tu frontend len

export default router