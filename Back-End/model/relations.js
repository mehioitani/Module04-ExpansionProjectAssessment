import Category from "./categoryModel.js";
import Product from "./productModel.js";
import Supplier from "./supplierModel.js";
import User from "./userModel.js";

Category.hasMany(Product, {
  foreignKey: "categoryId",
  allowNull: false,
  onDelete: "CASCADE",
});
Product.belongsTo(Category, { foreignKey: "categoryId", allowNull: false });

Supplier.hasMany(Product, {
  foreignKey: "supplierId",
  as: "product",
});
Product.belongsTo(Supplier, { foreignKey: "supplierId", as: "supplier" });

Supplier.hasMany(Category, {
  foreignKey: "supplierId",
  as: "category",
});
Category.belongsTo(Supplier, { foreignKey: "supplierId", as: "supplier" });

User.hasMany(Product, {
  foreignKey: "userId",
  as: "product",
});
Product.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Category, {
  foreignKey: "userId",   
  as: "category",
});

export default {
  Category,
  Product,
  Supplier,
  User
};
