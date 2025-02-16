import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    size: String,
    color: String,
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      default: 0,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    image: [String],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    userEdited: String,
    dateEdited: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const SubProductModel = mongoose.model("subProducts", schema);
export default SubProductModel;
