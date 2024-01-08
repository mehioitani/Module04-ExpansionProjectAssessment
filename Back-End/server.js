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

// "id": 1,
// "name": "admin",
// "email": "admin@gmail.com",
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA0NzExMTA3LCJleHAiOjE3MDQ3OTc1MDd9.qvV08we-i4yW64fHLiwAzfIJ3zTuBNZtdKo0Oh-FUe4"
