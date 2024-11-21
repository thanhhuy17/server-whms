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
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const CategoryModel = mongoose.model('categories', CategorySchema)
export default CategoryModel