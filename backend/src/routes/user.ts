import express from "express";
import { updateUser } from "../controllers/userController";
import isAuth from "../utils/isAuth";


const router = express.Router()

router.use('/update',isAuth,updateUser)

export default router
