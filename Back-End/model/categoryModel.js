import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define("Category", {
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Category;
