import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const createUser = async (req, res, next) => {
  const { email, password,userName } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    email,
    userName,
    password: hashedPassword,
  });
  try {
    const user = await newUser.save();
    const { email: emailId } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      email: emailId,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const signInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isValidUser = await User.findOne({ email });

    if (!isValidUser) return next(errorHandler(404, "user not found"));
    const isValidPassword = bcrypt.compareSync(password, isValidUser.password);
    if (!isValidPassword) return next(errorHandler(401, "wrong credentials"));
    const { userName, email: emailId, contactNumber } = isValidUser._doc;
    const token = jwt.sign({ id: isValidUser._id }, process.env.JWT_SECRET);
    res.status(200).json({
     
        userName,
        email: emailId,
        contactNumber,
        token,
      
    });
  } catch (error) {
    next(error);
  }
};

export const getProfileInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(errorHandler(404, "User Not Found"));
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
