// import moment from "moment";
import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({

    productName: {
        type: String,
        require: true
    },
    slug: String,
    description: String,
    // categories: [String],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,  // Dùng ObjectId cho category
        ref: 'category'  // Chỉ định đây là tham chiếu đến collection 'Category' (nếu có)
    }],
    // suppliers:[{
    //     require: true,
    //     type: String
    // }],
    suppliers: [{
        type: mongoose.Schema.Types.ObjectId,  // Dùng ObjectId cho suppliers
        ref: 'suppliers'  // Chỉ định đây là tham chiếu đến collection 'Suppliers' (nếu có)
    }],
    expiryDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["New", "Pending", "Approved", "Rejected"],
        default: 'New'
    },
    photoUrls: {
        type: [String]
    },
    userCreated: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    userEdited: String,
    dateEdited: {
        type: Date,
        default: Date.now
    },

})

const ProductModel = mongoose.model("products", ProductSchema)
export default ProductModel 