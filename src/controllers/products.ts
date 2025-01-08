import { addNewProductForm } from "../forms/addNewProduct";
import { productForm } from "../forms/product";
import CategoryModel from "../models/CategoryModel";
import ProductModel from "../models/ProductModel";
import SubProductModel from "../models/SubProductModel";
// import SupplierModel from "../models/SupplierModel";

// -------- GET ALL PRODUCTS -----------
const getProduct = async (req: any, res: any) => {
  const { page, pageSize } = req.query;
  console.log("Test Page Product: ", page, pageSize);
  try {
    const skip = (page - 1) * pageSize;

    // Only Show Supplier have isDeleted === false. 
    const products = await ProductModel.find({
      $or: [{ isDeleted: false }, { isDeleted: null }],
    })
      .skip(skip)
      .limit(pageSize)
      .populate("suppliers", "name")
      .populate("categories", "title");
    // Total Row Product
    const total = await ProductModel.countDocuments({
      $or: [{ isDeleted: false }, { isDeleted: null }],
    });
    console.log("Check Total Page Products: ", total);
    const items: any = []
    if (products.length > 0) {
      products.forEach(async (item: any) => {
        const children = await SubProductModel.find({ productId: item._id })

        items.push({
          ...item._doc,
          children,
        })
        items.length === products.length && res.status(200).json({
          message: "Get All Products Successfully",
          data: { total, items }
        });
      })
    } else {
      res.status(200).json({
        message: "Get All Products Successfully",
        // data: { total, products },
        data: [],
      });
    }




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
  console.log("Id Delete Product: ", id);
  try {
    // await ProductModel.findByIdAndDelete(id);
    await ProductModel.findByIdAndUpdate(id, { isDeleted: true });

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

// --------------- GET PRODUCTS FOR EXPORT (Important) ---------------------
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

// ------------ ADD SUB PRODUCT -------------
const addSubProduct = async (req: any, res: any) => {
  const body = req.body;

  try {
    const newSubProduct = new SubProductModel(body);
    await newSubProduct.save();
    res.status(200).json({
      message: `Add New SubProduct Successfully`,
      data: newSubProduct,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//------------ CATEGORY ---------------------------------------------------------------------------------------
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
  const { page, pageSize } = req.query;
  console.log("Test Page Categories: ", page, pageSize);

  try {
    const skip = (page - 1) * pageSize;

    const categories = await CategoryModel.find({
      $or: [{ isDeleted: false }, { isDeleted: null }],
    })
      .skip(skip)
      .limit(pageSize);
    // .populate('category', 'title'); // 'category' là trường tham chiếu đến Category, 'title' là tên trường bạn muốn lấy;

    // Total Row Category
    const total = await CategoryModel.countDocuments({
      $or: [{ isDeleted: false }, { isDeleted: null }],
    });
    console.log("Check Total Page Categories: ", total);

    res.status(200).json({
      message: `Get Category Successfully`,
      data: { total, categories },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// -------- GET CATEGORY DETAIL -----------
const getCategoryDetail = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    const item = await CategoryModel.findById(id);

    res.status(200).json({
      message: `Get Category Detail Successfully`,
      data: item,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// ------------ UPDATE CATEGORY ------------
const updateCategory = async (req: any, res: any) => {
  const body = req.body;
  const { id } = req.query;
  // console.log("check id category: ", id);
  try {
    // const updatedCategory =
    await CategoryModel.findByIdAndUpdate(id, body);

    // if (!updatedCategory) {
    //   return res.status(404).json({ message: "Category not found" });
    // }

    res.status(200).json({
      message: `Category Updated`,
      data: [],
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// ------------ DELETE CATEGORY ------------
const findAndRemoveCategoryInProduct = async (id: string) => {
  const items = await CategoryModel.find({ parentId: id });
  console.log("Check: ", items);
  if (items.length > 0) {
    items.forEach(
      async (item: any) => await findAndRemoveCategoryInProduct(item._id)
    );
  }
  await handleRemoveCategoryInProduct(id);
};

const handleRemoveCategoryInProduct = async (id: string) => {
  // await CategoryModel.findByIdAndDelete(id);
  await CategoryModel.findByIdAndUpdate(id, { isDeleted: true });

  // Tìm những sản phẩm nào mà trước đó có dính dáng với categoryId được gửi lên
  // thì xóa category trong cái sản phẩm đó đi theo luôn.
  const products = await ProductModel.find({ categories: { $all: id } });
  // console.log("SV Product: ", products);
  if (products && products.length > 0) {
    products.forEach(async (item: any) => {
      // Lấy các category ra cho vào mảng cats
      const cats = item._doc.categories;
      // So sánh category nào trùng với ID thì xóa ra khỏi mảng cats
      const index = cats.findIndex((element: string) => element === id);
      if (index !== -1) {
        cats.splice(index, 1);
      }
      // Update lại ProductModel với Id category đã bị xóa
      await ProductModel.findByIdAndUpdate(item._id, { categories: cats });
    });
  }
};

const deleteCategory = async (req: any, res: any) => {
  const { id, isDeleted } = req.query;
  // If isDeleted === true=> Xoá luôn : Chỉ cập nhật trạng thái hiển thị của Category

  console.log("Check ID Delete Category: ", id);

  try {
    await findAndRemoveCategoryInProduct(id);

    // Xóa luôn
    if (isDeleted === true) {
      await CategoryModel.findByIdAndDelete(id);
    }
    // Xóa mềm
    else {
      await CategoryModel.findByIdAndUpdate(id, { isDeleted: true });
    }
    await res.status(200).json({
      message: "Category Deleted",
      data: [],
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
  getCategories,
  getCategoryDetail,
  updateCategory,
  deleteCategory,
  addSubProduct,
};
