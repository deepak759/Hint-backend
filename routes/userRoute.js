import express from "express";
import {

  getProfileInfo,
  authenticateUser,
} from "../controllers/userController.js";
import { verifyUser } from "../middleware/jwt-verfication.js";

const router = express.Router();

router.post("/authenticate", authenticateUser);

router.post("/profile", verifyUser, getProfileInfo);

export default router;
