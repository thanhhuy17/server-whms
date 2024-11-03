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
            placeholder: `Enter Product Name`,
            type: `input`,
            displayLength: 160

        },
        {
            key: `productId`,
            value: `productId`,
            require: true,
            message: `Please Enter Product Id!`,
            label: `Product Id`,
            placeholder: `Enter Product Id`,
            type: `input`,
            displayLength: 160

        },
        {
            key: `category`,
            value: `category`,
            require: true,
            message: `Please Enter Category!`,
            label: `Category`,
            placeholder: `Enter Category`,
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
