import mongoose, { Schema } from "mongoose";

const supplierSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    slug: String,
    product: String,
    email: String,
    active: Number,
    categories: {
        type: [String]
    },
    price: Number,
    contactNumber: String,
    isTaking: {
        type: Boolean,
        default: 0,
        enum: [0, 1]
    },
    photoUrl: String,
    status: {
        type: String,
        enum: ["New", "Pending", "Approved", "Rejected", "Blacklisted"],
        default: 'New'
    },
    userCreated: String,
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    userEdited: String,
    dateEdited: {
        type: Date,
        default: Date.now()
    },
})

const SupplierModel = mongoose.model("suppliers", supplierSchema)
export default SupplierModel 