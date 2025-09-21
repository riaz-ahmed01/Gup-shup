import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token =
    req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
  // console.log("token tou mil raha hai",token);

  if (!token) {
    return next(new errorHandler("Invalid token", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = (req.user = await User.findById(decoded.id));

    if (!user) {
      return next(new errorHandler("User not found", 404));
    }

    // req.user = user;

    next();
  } catch (error) {
    return next(new errorHandler("Not authorized", 401));
  }
});
