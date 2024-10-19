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
    createdAt: {
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
    }
})

const SupplierModel = mongoose.model("suppliers", supplierSchema)
export default SupplierModel 