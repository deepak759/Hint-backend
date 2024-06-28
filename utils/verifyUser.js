import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyUser = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  
  // Check if the Authorization header is present and formatted correctly
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(errorHandler(401, "You are not authorized, kindly login first"));
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorHandler(401, "Invalid token"));
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

