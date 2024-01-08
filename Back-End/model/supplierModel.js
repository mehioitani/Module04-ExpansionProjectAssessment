import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Supplier = sequelize.define("Supplier", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Supplier;
