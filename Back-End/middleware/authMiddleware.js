import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Supplier from "../model/supplierModel.js";

const Protect = asyncHandler(async (req, res, next) => {
  let token;
  //when the token is sent in authorization header (check)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      //split to turn it into an array of 2 elements because it is written as bearer token and we want the token which is on index 1
      token = req.headers.authorization.split(" ")[1];

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get supplier from the token
      //decoded.id (id that we set in the supplier controller in generateToken function)
      const supplier = await Supplier.findByPk(decoded.id, {
        attributes: { exclude: ["password"] }, // Exclude the password field
      });
      //so we can access the supplier in any protected route
      req.supplier = supplier;

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default Protect;
