import { productForm } from "../forms/product"

const getProduct = async (req: any, res: any) => {
    try {
        res.status(200).json({
            message: 'Get Products Successfully',
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

export { getProduct, getFormProduct }