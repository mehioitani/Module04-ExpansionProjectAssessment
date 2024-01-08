import asyncHandler from "express-async-handler";
import Category from "../model/categoryModel.js";
import Supplier from "../model/supplierModel.js";
// import Category from '../model/relations.js'

// @desc    Get categories
// @route   GET /api/categories
// @access  Private
export const getAllCategories = asyncHandler(async (req, res) => {
  const category = await Category.findAll({
    where: { supplierId: req.supplier.id },
    order: [["id", "DESC"]],
  });
  res.status(200).json(category);
});

// @desc    Get one category
// @route   GET /api/categories/:id
// @access  Private
export const getOneCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id, {
    order: [["id", "DESC"]],
  });
  if (!category) {
    res.status(400);
    throw new Error("Cannot find category");
  }
  res.status(200).json(category);
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private
export const createCategory = asyncHandler(async (req, res) => {
  const { category_name } = req.body;

  // Check if a category with the same name already exists
  const existingCategory = await Category.findOne({ where: { category_name } });
  if (existingCategory) {
    // If the category exists, send an error message
    res.status(400);
    throw new Error("Category name must be unique.");
  }

  const createdCategory = await Category.create({
    ...req.body,
    supplierId: req.supplier.id,
  });
  res.status(200).json(createdCategory);
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  const supplier = await Supplier.findOne({ where: { id: req.supplier.id } });

  //Check for supplier
  if (!supplier) {
    res.status(401);
    throw new Error("supplier not found");
  }

  // Make sure the logged in supplier matches the supplier category
  if (String(category.supplierId) !== String(supplier.id)) {
    res.status(401);
    throw new Error("supplier not authorized");
  }

  await Category.update({ ...req.body }, { where: { id: id } });
  const updatedCategory = await Category.findByPk(id);
  res.status(200).json(updatedCategory);
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  const supplier = await Supplier.findOne({ where: { id: req.supplier.id } });

   //Check for supplier
    if (!supplier) {
      res.status(401);
      throw new Error("supplier not found");
    }

    // Make sure the logged in supplier matches the supplier category
    if (category.supplierId !== supplier.id) {
      res.status(401);
      throw new Error("supplier not authorized");
    }

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }
  await category.destroy();
  res.status(200).json(category);
});
