// import moment from "moment";
import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    productId: {
        type: String,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    slug: String,
    categories: {
        type: [String],
    },
    buyingPrice: Number,
    quantity: Number,
    unit: [String],
    thresholdValue: Number,
    expiryDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["New", "Pending", "Approved", "Rejected"],
        default: 'New'
    },
    userCreated: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // },
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