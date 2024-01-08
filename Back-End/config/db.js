import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize("expansion", "sa", `${process.env.DB_PASSWORD}`, {
  host: "localhost",
  dialect: "mssql",
  port: "1433",
  dialectOptions: {
    options: {
      encrypt: true,
    }
  }
});


try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
