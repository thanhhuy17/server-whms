export const addNewProductForm = {
    title: `Add New Product`,
    fontSize: 20,
    layout: `vertical`,
    size: `middle`,
    formItems: [
        {
            key: `productName`,
            value: `productName`,
            label: `Product Name`,
            require: true,
            message: `Please enter product title`,
            type: `input`
        },
        {
            key: `description`,
            value: `description`,
            label: `Description`,
            require: false,
            message: ``,
            type: `inputTextArea`
        },
        // {
        //     key: `categories`,
        //     value: `categories`,
        //     label: `Categories`,
        //     required: false,
        //     message: ``,
        //     type: `inputTextArea`
        // }
    ]

}