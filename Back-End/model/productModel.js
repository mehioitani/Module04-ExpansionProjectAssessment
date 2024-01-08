import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },

});

export default Product;
