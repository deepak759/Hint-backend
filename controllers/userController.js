import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";



export const authenticateUser = async (req, res, next) => {
  try {
    const { email, phoneNumber, facebookId } = req.body;
  
    let user = await User.findOne({
      $or: [
        { email: email || !null },
        { phoneNumber: phoneNumber || !null },
        { facebookId: facebookId || !null },
      ],
    });

    // If the user does not exist, create a new user
    if (!user) {
      user = new User(req.body);
      await user.save();
      res.status(201); // Set status to 201 Created for new user
    } else {
      res.status(200); // Set status to 200 OK for existing user
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Respond with user data and token
    res.json({ user, token });
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};


export const getProfileInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(errorHandler(404, "User Not Found"));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
