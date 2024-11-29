import mongoose from "mongoose";
import { supplierForm } from "../forms/supplier";
import CategoryModel from "../models/CategoryModel";
import SupplierModel from "../models/SupplierModel"


// -------- GET ALL SUPPLIERS -----------
const getSuppliers = async (req: any, res: any) => {
    const { page, pageSize } = req.query
    console.log("Test Page:  ", page, pageSize);
    try {
        const skip = (page - 1) * pageSize
        // Only Show Supplier have isDeleted === false
        const items = await SupplierModel.find({ isDeleted: false }).skip(skip).limit(pageSize);
        // Total row
        const total = await SupplierModel.countDocuments()
        console.log("Check Total: ", total);


        res.status(200).json({
            message: 'Get All Suppliers Successfully',
            data: { total, items }
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
            // message: "error.message HUY"
        })
    }
}
// const getSuppliers = async (req: any, res: any) => {
//     const { page, pageSize } = req.query;
//     console.log("Test Page:  ", page, pageSize);
//     try {
//         // Tìm tất cả các tài liệu trong collection
//         const allSuppliers = await SupplierModel.find({ isDeleted: false });

//         // Tìm các tài liệu bị trùng dựa trên trường 'product'
//         const seenProducts = new Set();
//         const duplicateIds: string[] = [];
//         allSuppliers.forEach((supplier: any) => {
//             if (seenProducts.has(supplier.product)) {
//                 // Nếu 'product' đã tồn tại, thêm ID vào danh sách cần xóa
//                 duplicateIds.push(supplier._id);
//             } else {
//                 // Nếu chưa tồn tại, thêm 'product' vào Set
//                 seenProducts.add(supplier.product);
//             }
//         });

//         // Xóa tất cả các tài liệu bị trùng
//         if (duplicateIds.length > 0) {
//             await SupplierModel.deleteMany({ _id: { $in: duplicateIds } });
//             console.log(`Deleted ${duplicateIds.length} duplicate suppliers.`);
//         }

//         // Paginate dữ liệu sau khi loại bỏ trùng lặp
//         const skip = (page - 1) * pageSize;
//         const items = await SupplierModel.find({ isDeleted: false })
//             .skip(skip)
//             .limit(pageSize);
//         const total = await SupplierModel.countDocuments({ isDeleted: false });

//         res.status(200).json({
//             message: `Get All Suppliers Successfully. Removed ${duplicateIds.length} duplicate suppliers.`,
//             data: { total, items },
//         });
//     } catch (error: any) {
//         res.status(404).json({
//             message: error.message,
//         });
//     }
// };

//     ----------------
// -------- ADD NEW SUPPLIER ---------
const addNewSupplier = async (req: any, res: any) => {
    const body = req.body
    console.log("Check 1: ", body)
    
    try {
        const newSupplier = new SupplierModel(body)
        console.log("Check 2: ",newSupplier);
        newSupplier.save()
        res.status(200).json({
            message: 'Add New Supplier Successfully',
            data: newSupplier,
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

// const addNewSupplier = async (req: any, res: any) => {
//     const body = req.body;
//     console.log(body);

//     try {
//         // Chuyển categoryId thành ObjectId nếu là chuỗi
//         const categoryIds = body.categories.map((categoryId: string) =>new mongoose.Types.ObjectId(categoryId));

//         // Tạo mới nhà cung cấp với categoryIds đã chuyển thành ObjectId
//         const newSupplier = new SupplierModel({
//             ...body,
//             categories: categoryIds,  // Gán categories là mảng ObjectId
//         });

//         // Lưu nhà cung cấp mới
//         await newSupplier.save();

//         res.status(200).json({
//             message: 'Add New Supplier Successfully',
//             data: newSupplier,
//         });
//     } catch (error: any) {
//         res.status(404).json({
//             message: error.message,
//         });
//     }
// };

// -------- UPDATE SUPPLIER ---------
const updateSupplier = async (req: any, res: any) => {
    const body = req.body
    const { id } = req.query
    // console.log("Check id: ", id);

    try {

        await SupplierModel.findByIdAndUpdate(id, body)

        res.status(200).json({
            message: `Supplier Updated`,
            data: [],
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}
// -------- DELETE SUPPLIER ---------
const deleteSupplier = async (req: any, res: any) => {

    const { id } = req.query
    try {

        await SupplierModel.findByIdAndDelete(id)

        res.status(200).json({
            message: `Supplier Deleted`,
            data: [],
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

// -------- GET FORM SUPPLIER DYNAMIC ---------
const getFormSupplier = async (req: any, res: any) => {
    try {
        const form = supplierForm
        res.status(200).json({
            message: `Get Form Success`,
            data: form
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        })
    }
}
// -------- GET SUPPLIERS FOR EXPORT -----------
const getSuppliersForExport = async (req: any, res: any) => {
    const body = req.body;
    const { start, end } = req.query;
    // console.log("Check date send to Server:  ", body, start, end);
    const filter: any = {}
    if (start && end) {
        filter.createdAt = {
            $lte: end,
            $gte: start
        }
    }

    try {
        const items = await SupplierModel.find(filter)
        // console.log("check items: ",items.length);

        const data: any = [];
        if (items.length > 0) {
            items.forEach((item: any) => {
                const value: any = {};

                body.forEach((key: string) => {
                    value[`${key}`] = `${item._doc[`${key}`] ?? ""}`

                })
                // console.log("check value: ",value);
                data.push(value)
            })
        }


        res.status(200).json({
            message: 'Get Suppliers Export Successfully',
            data: data
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
            // message: "error.message HUY"
        })
    }
}

export { getSuppliers, addNewSupplier, updateSupplier, deleteSupplier, getFormSupplier, getSuppliersForExport }