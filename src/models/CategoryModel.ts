import mongoose, { Schema } from "mongoose";
// Category Table
const CategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    parentId: String,
    slug: {
        type: String
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userCreated: String,
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    userEdited: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const CategoryModel = mongoose.model('category', CategorySchema)
export default CategoryModel