import { asyncHandler } from "../utils/asyncHandler.js";
import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc    Register a new user

export const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender } = req.body;
  // console.log(fullName, username);

  // Validate input fields

  if (
    [fullName, username, password, gender].some(
      (field) => field === undefined || field?.trim() === ""
    )
  ) {
    return next(new errorHandler("All fields are required", 400));
  }

  // Check if username already exists

  const user = await User.findOne({ username });
  if (user) {
    return next(new errorHandler("Username already exists", 400));
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Use hashed password

  // Generate avatar

  const avatarType = gender === "male" ? "boy" : "girl";
  const avatarUrl = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

  // Create new user

  const newUser = await User.create({
    fullName,
    username,
    password: hashedPassword,
    gender,
    avatar: avatarUrl,
  });

  // Generate JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Send response
  await newUser.save();
   res
    .status(201)
    .cookie("token", token, {
      expiresIn: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),

      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      data: newUser,
      token,
      message: "User registered successfully",
    });
});

// login user

export const loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // Validate input fields
  if (
    [username, password].some(
      (field) => field === undefined || field?.trim() === ""
    )
  ) {
    return next(new errorHandler("All fields are required", 400));
  }

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return next(new errorHandler("Invalid credentials", 401));
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new errorHandler("Invalid credentials", 401));
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Send response with cookie

  res
    .status(200)
    .cookie("token", token, {
      expiresIn: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })

    .json({
      message: "User logged in successfully",
      success: true,
      data: user,
      token,
    });
});

// logout user

export const logoutUser = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User logged out successfully",
    });
});

// get user profile

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const profile = await User.findById(userId).select("-password");
  if (!profile) {
    return next(new errorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: profile,
    message: "User profile fetched successfully",
  });
});

// get other user id

export const getOtherUser = asyncHandler(async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.user._id } });

  res.status(200).json({
    success: true,
    data: otherUsers,
    message: "Other users fetched successfully",
  });
});
