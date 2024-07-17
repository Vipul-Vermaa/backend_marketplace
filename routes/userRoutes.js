import  express  from "express";
import { changePassword, getMyProfile, login, logout, register, updateProfile } from "../controllers/userController.js";
import {isAuthenticated} from '../middlewares/auth.js'
import { validate } from "../models/User.js";
import {signUpSchema} from '../models/User.js'


const router=express.Router()

router.route('/register').post(validate(signUpSchema),register)
router.route('/login').post(login)
router.route('/logout').get(logout)

router.route('/updateprofile').put(isAuthenticated,updateProfile)

router.route('/changepassword').put(isAuthenticated,changePassword)

router.route('/me').get(isAuthenticated,getMyProfile)

export default router