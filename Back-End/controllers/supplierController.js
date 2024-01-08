import Supplier from "../model/supplierModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerSupplier = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create Supplier
  const supplier = await Supplier.create({
    name,
    email,
    password: hashedPassword,
  });
  //checking if Supplier is created
  if (supplier) {
    res.status(201).json({
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      token: generateToken(supplier.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid supplier Data");
  }
});

export const loginSupplier = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  // Check for supplier email
  const supplier = await Supplier.findOne({ where: { email } });
  //if supplier and password are correct return the supplier data
  if (supplier && (await bcrypt.compare(password, supplier.password))) {
    res.json({
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      token: generateToken(supplier.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

export const getSupplier = asyncHandler(async (req, res) => {
  //req.supplier.id that we set in the middleware
  const { id, name, email } = await Supplier.findByPk(req.supplier.id);

  res.status(200).json({
    id: id,
    name,
    email,
  });
});

// Generate JWT
export const generateToken = (id) => {
  //this will sign a new token with the id passed in with the used secret and will expire in 1 day
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
