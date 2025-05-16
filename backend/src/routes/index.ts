import express from "express"
import authRoutes from './auth'
import wordRoutes from './word'


const router = express.Router()

router.use('/auth',authRoutes)
router.use("/word",wordRoutes)


export default router
