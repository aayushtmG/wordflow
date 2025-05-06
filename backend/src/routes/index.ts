import express from "express"
import userRoutes from './user.js'
import authRoutes from './auth.js'
import wordRoutes from './word.js'
import isAuth from "../utils/isAuth.js"


const router = express.Router()

router.use('/auth',authRoutes)

router.use("/word",wordRoutes)


export default router