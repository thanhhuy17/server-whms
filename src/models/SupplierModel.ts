import mongoose, { Schema } from "mongoose";
// Supplier Table
const supplierSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    slug: String,
    product: String,
    email: String,
    active: Number,
    category: {
        type: [String]
    },
    // categories: [{
    //     type: mongoose.Schema.Types.ObjectId,  // Dùng ObjectId cho category
    //     ref: 'categories'  // Chỉ định đây là tham chiếu đến collection 'Category' (nếu có)
    // }],
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
    createdAt: {
        type: Date,
        default: Date.now()
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