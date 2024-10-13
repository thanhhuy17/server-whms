import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    productId:{
        type: String,
        require: true
    }
})

const ProductModel = mongoose.model("products", ProductSchema)
export default ProductModel 