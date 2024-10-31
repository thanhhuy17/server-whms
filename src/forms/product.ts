// ------------ SUPPLIER FORM --------------
export const productForm = {
    title: `Products`,
    layout: `horizontal`,
    labelCol: 6,
    wrapperCol: 18,
    labelAlign: "left",
    size: `middle`,
    formItems: [
        {
            key: `name`,
            value: `name`,
            require: true,
            message: `Please Enter Supplier Name!`,
            label: `Supplier Name`,
            placeholder: `Enter Supplier Name`,
            type: `input`,
            displayLength: 160

        },
        {
            key: `email`,
            value: `email`,
            require: true,
            message: `Please Enter Email!`,
            label: `Email`,
            placeholder: `Enter Supplier Email`,
            type: `input`,
            displayLength: 200


        },
        {
            key: `product`,
            value: `product`,
            require: true,
            message: `Enter Product!`,
            label: `Product`,
            placeholder: `Enter Product`,
            type: `input`,
            displayLength: 150

        },
        {
            key: `category`,
            value: `category`,
            // require: true,
            // message: `Enter Product!`,
            label: `Category`,
            placeholder: `Select product category`,
            type: `select`,
            displayLength: 150

        },
        {
            key: `price`,
            value: `price`,
            // require: true,
            // message: `Enter Product!`,
            label: `Buying Price`,
            placeholder: `Enter buying price`,
            type: `input`,
            displayLength: 150

        },
        {
            key: `contactNumber`,
            value: `contactNumber`,
            // require: true,
            // message: `Enter Product!`,
            label: `Contact Number`,
            placeholder: `Enter supplier contact number`,
            type: `input`,
            displayLength: 150

        },
        {
            key: `active`,
            value: `active`,
            // require: true,
            // message: `Enter Product!`,
            label: `Active`,
            placeholder: `Enter Active number`,
            type: `number`,
            // typeInput: `number`,
            displayLength: 50

        },
        {
            key: `type`,
            value: `type`, //name
            // require: true,
            // message: `Enter Product!`,
            label: `Taking Return`,
            // placeholder: `Enter Active number`,
            type: `checkbox`,
            displayLength: 150

        },

    ]
}

// ------------ SUPPLIER COLUMN TABLE --------------
// export const supplierCol = [
//     {

//     }
// ]
