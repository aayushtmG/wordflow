import express from "express"
import userRoutes from './users/index.js'
import isAuth from "../utils/isAuth.js"

const router = express.Router()

router.use('/users',isAuth,userRoutes)



export default router