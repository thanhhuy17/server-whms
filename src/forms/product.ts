// ------------ PRODUCT FORM --------------
export const productForm = {
    title: `Products`,
    layout: `horizontal`,
    labelCol: 6,
    wrapperCol: 18,
    labelAlign: "left",
    size: `middle`,
    nameButton: `Add Product`, //Add Supplier
    formItems: [
        {
            key: `productName`,
            value: `productName`,
            require: true,
            message: `Please Enter Product Name!`,
            label: `Product Name`,
            placeholder: `Enter product name`,
            type: `input`,
            displayLength: 160

        },
        {
            key: `productId`,
            value: `productId`,
            require: true,
            message: `Please Enter Product Id!`,
            label: `Product Id`,
            placeholder: `Enter product Id`,
            type: `input`,
            displayLength: 160

        },
        {
            key: `category`,
            value: `category`,
            // require: true,
            message: `Please Select Category!`,
            label: `Category`,
            placeholder: `Select product category`,
            type: `select`,
            displayLength: 160

        },
        {
            key: `buyingPrice`,
            value: `buyingPrice`,
            require: true,
            message: `Please Enter Buying Price!`,
            label: `Buying Price`,
            placeholder: `Enter buying price`,
            type: `input`,
            displayLength: 160

        },
        {
            key: `quantity`,
            value: `quantity`,
            require: true,
            message: `Please Enter Quantity!`,
            label: `Quantity`,
            placeholder: `Enter product quantity`,
            type: `input`,
            displayLength: 160

        },
        {
            key: `unit`,
            value: `unit`,
            require: true,
            message: `Please Enter Unit!`,
            label: `Unit`,
            placeholder: `Enter product unit`,
            type: `input`,
            displayLength: 160

        },
        {
            // Chỉnh lại
            key: `expiryDate`,
            value: `expiryDate`,
            require: true,
            message: `Please Enter Expiry Date!`,
            label: `Expiry Date`,
            placeholder: `Enter expiry date`,
            type: `input`,
            displayLength: 160

        },
        {
            // Chỉnh lại
            key: `thresholdValue`,
            value: `thresholdValue`,
            require: true,
            message: `Please Enter Threshold Value!`,
            label: `Threshold Value`,
            placeholder: `Enter threshold value`,
            type: `input`,
            displayLength: 160

        },


    ]
}

// ------------ SUPPLIER COLUMN TABLE --------------
// export const supplierCol = [
//     {

//     }
// ]
