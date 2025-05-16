import express from 'express'
import {createWord, updateWord} from '../controllers/wordController'
import isAuth from '../utils/isAuth'
const router = express.Router()


router.post('/create',isAuth,createWord)
router.patch('/update/:wordId',updateWord)


export default router
