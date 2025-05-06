import express from 'express'
import {createWord, updateWord} from '../controllers/wordController.js'
import isAuth from '../utils/isAuth.js'
const router = express.Router()


router.use('/create',isAuth,createWord)
router.use('/update',updateWord)


export default router
