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
        })
    }
}

// -------- ADD NEW SUPPLIER ---------
const addNewSupplier = async (req: any, res: any) => {
    const body = req.body

    try {
        const newSupplier = new SupplierModel(body)
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
// -------- UPDATE SUPPLIER ---------
const updateSupplier = async (req: any, res: any) => {
    const body = req.body
    const { id } = req.query
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
        const form = {
            title: `Supplier`,
            layout: `horizontal`,
            labelCol: 6,
            wrapperCol: 18,
            size: `middle`,
            formItems: [
                {
                    key: `name`,
                    value: `name`, // name
                    require: true,
                    message: `Please Enter Supplier Name!`,
                    label: `Supplier Name`,
                    placeholder: `Enter Supplier Name`,
                    type: `default`

                },
                {
                    key: `email`,
                    value: `email`, //name
                    require: true,
                    message: `Please Enter Email!`,
                    label: `Email`,
                    placeholder: `Enter Supplier Email`,
                    type: `default`,

                },
                {
                    key: `product`,
                    value: `product`, //name
                    require: true,
                    message: `Enter Product!`,
                    label: `Product`,
                    placeholder: `Enter Product`,
                    type: `default`,

                },
                {
                    key: `category`,
                    value: `category`, //name
                    // require: true,
                    // message: `Enter Product!`,
                    label: `Category`,
                    placeholder: `Select product category`,
                    type: `select`,

                },
                {
                    key: `price`,
                    value: `price`, //name
                    // require: true,
                    // message: `Enter Product!`,
                    label: `Buying Price`,
                    placeholder: `Enter buying price`,
                    type: `default`,

                },
                {
                    key: `contactNumber`,
                    value: `contactNumber`, //name
                    // require: true,
                    // message: `Enter Product!`,
                    label: `Contact Number`,
                    placeholder: `Enter supplier contact number`,
                    type: `default`,

                },
                {
                    key: `active`,
                    value: `active`, //name
                    // require: true,
                    // message: `Enter Product!`,
                    label: `Active`,
                    placeholder: `Enter Active number`,
                    type: `default`,

                },
                {
                    key: `type`,
                    value: `type`, //name
                    // require: true,
                    // message: `Enter Product!`,
                    label: `Type`,
                    // placeholder: `Enter Active number`,
                    type: `button`,

                },

            ]
        }
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


export { getSuppliers, addNewSupplier, updateSupplier, deleteSupplier, getFormSupplier }