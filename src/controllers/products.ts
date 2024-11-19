import { addNewProductForm } from "../forms/addNewProduct";
import { productForm } from "../forms/product";
import CategoryModel from "../models/CategoryModel";
import ProductModel from "../models/ProductModel";

// -------- GET ALL PRODUCTS -----------
const getProduct = async (req: any, res: any) => {
  const { page, pageSize } = req.query;
  console.log("Test Page Product: ", page, pageSize);
  try {
    const skip = (page - 1) * pageSize;

    // Only Show Supplier have isDeleted === false
    const items = await ProductModel.find({ isDeleted: false })
      .skip(skip)
      .limit(pageSize);

    // Total Row Product
    const total = await ProductModel.countDocuments();
    console.log("Check Total Page Products: ", total);

    res.status(200).json({
      message: "Get All Products Successfully",
      data: { total, items },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
// -------- ADD NEW PRODUCT -----------
const addNewProduct = async (req: any, res: any) => {
  const body = req.body;
  try {
    const newProduct = new ProductModel(body);
    newProduct.save();
    res.status(200).json({
      message: `Add New Product Successfully`,
      data: newProduct,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
// ------------ UPDATE PRODUCT ------------
const updateProduct = async (req: any, res: any) => {
  const body = req.body;
  const { id } = req.query;
  // console.log("check id product: ", id);
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: `Product Updated`,
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// ------------ DELETE PRODUCT ------------
const deleteProduct = async (req: any, res: any) => {
  const { id } = req.query;
  try {
    await ProductModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product Deleted",
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// -------- GET FORM PRODUCT DYNAMIC ---------
const getFormProduct = async (req: any, res: any) => {
  try {
    const form = productForm;
    res.status(200).json({
      message: `Get Form Success`,
      data: form,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// -------- GET FORM ADD NEW PRODUCT DYNAMIC ---------
const getFormAddNewProduct = async (req: any, res: any) => {
  try {
    const form = addNewProductForm;
    res.status(200).json({
      message: `Get Form Add New Product Success`,
      data: form,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// --------------- GET PRODUCTS FOR EXPORT ---------------------
const getProductForExport = async (req: any, res: any) => {
  const body = req.body;
  const { start, end } = req.query;
  console.log("getProductForExport: ", body, start, end);

  const filter: any = {};
  if (start && end) {
    filter.createdAt = {
      $lte: end,
      $gte: start,
    };
  }

  try {
    const items = await ProductModel.find(filter);
    const data: any = [];
    if (items.length > 0) {
      items.forEach((item: any) => {
        const value: any = {};

        body.forEach((key: string) => {
          value[`${key}`] = `${item._doc[`${key}`] ?? ""}`;
        });
        data.push(value);
      });
    }

    res.status(200).json({
      message: "Get Products For Export Excel Successfully",
      data: data,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
//----------------------------------------------------------------
// -------- ADD NEW CATEGORY -----------
const addNewCategory = async (req: any, res: any) => {
  const body = req.body;
  const { parentId, category, description, slug } = body;
  try {
    const category = await CategoryModel.find({
      $and: [{ parentId: { $eq: parentId } }, { slug: { $eq: slug } }],
    });
    if (category.length > 0) {
      throw Error("Category is existing");
    }

    const newCategory = new CategoryModel(body);
    newCategory.save();
    res.status(200).json({
      message: `Add New Category Successfully`,
      data: newCategory,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// -------- GET CATEGORIES -----------
const getCategories = async (req: any, res: any) => {
  const { page, pageSize } = req.query
  console.log("Test Page Categories: ", page, pageSize);
  
  // Total Row Product
  const total = await CategoryModel.countDocuments();
  console.log("Check Total Page Categories: ", total);

  try {
    const skip = (page - 1) * pageSize

    const categories = await CategoryModel.find().skip(skip).limit(pageSize);
    res.status(200).json({
      message: `Get Category Successfully`,
      data: {total, categories},
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export {
  getProduct,
  addNewProduct,
  getFormProduct,
  deleteProduct,
  updateProduct,
  getProductForExport,
  getFormAddNewProduct,
  addNewCategory,
  getCategories
};
