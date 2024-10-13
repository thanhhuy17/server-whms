import SupplierModel from "../models/SupplierModel"

const getSuppliers = async (req: any, res: any) => {
    try {
        res.status(200).json({
            message: 'Get Suppliers Successfully',
            data: []
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

const addNewSupplier = async (req: any, res: any) => {
    const body = req.body

    try {
        const newSupplier = new SupplierModel(body)
        newSupplier.save()
        res.status(200).json({
            message: 'Add new Supplier successfully',
            data: newSupplier,
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

export { getSuppliers, addNewSupplier }