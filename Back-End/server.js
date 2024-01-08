import express from "express";
import dotenv from "dotenv";
import supplierRoute from "./routes/supplierRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import sequelize from "../Back-End/config/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api", supplierRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);

sequelize.sync({ force: false });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


