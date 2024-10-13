import { Router } from "express";
import { addNewSupplier } from "../controllers/supplier";

const router = Router()

router.get('/') // get All cho phep frontend lay du lieu
router.post('/add-new-supplier', addNewSupplier) // dua du lieu tu frontend len

export default router