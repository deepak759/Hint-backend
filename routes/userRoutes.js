import  express  from "express";
import {createUser,signInUser,getProfileInfo} from '../controllers/userController.js'
import { verifyUser } from "../utils/verifyUser.js";
const router=express.Router()

router.post('/signup',createUser)
router.post('/signin',signInUser)

router.post('/profile',verifyUser,getProfileInfo)

export default router