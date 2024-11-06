import { productForm } from "../forms/product"
import ProductModel from "../models/ProductModel"

// -------- GET ALL PRODUCTS -----------
const getProduct = async (req: any, res: any) => {
    const { page, pageSize } = req.query
    console.log("Test Page Product: ", page, pageSize);
    try {
        const skip = (page - 1) * pageSize

        // Only Show Supplier have isDeleted === false
        const items = await ProductModel.find({ isDeleted: false }).skip(skip).limit(pageSize);

        // Total Row Product
        const total = await ProductModel.countDocuments()
        console.log("Check Total Page Products: ", total);

        res.status(200).json({
            message: 'Get All Products Successfully',
            data: { total, items }
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}
// -------- ADD NEW PRODUCT -----------
const addNewProduct = async (req: any, res: any) => {
    const body = req.body
    try {
        const newProduct = new ProductModel(body)
        newProduct.save()
        res.status(200).json({
            message: `Add New Product Successfully`,
            data: newProduct,
        })

    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}
// ------------ UPDATE PRODUCT ------------
const updateProduct = async (req: any, res: any) => {
    const body = req.body
    const { id } = req.query
    // console.log("check id product: ", id);
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: `Product Updated`,
            data: []
        })

    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

// ------------ DELETE PRODUCT ------------
const deleteProduct = async (req: any, res: any) => {
    const { id } = req.query
    try {
        await ProductModel.findByIdAndDelete(id)

        res.status(200).json({
            message: "Product Deleted",
            data: []
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

// -------- GET FORM PRODUCT DYNAMIC ---------
const getFormProduct = async (req: any, res: any) => {
    try {
        const form = productForm
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

export { getProduct, addNewProduct, getFormProduct, deleteProduct, updateProduct }