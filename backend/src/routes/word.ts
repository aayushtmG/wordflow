import express from 'express'
import {createWord, getAll, updateWord} from '../controllers/wordController'
import isAuth from '../utils/isAuth'
const router = express.Router()

router.get('/',getAll);
router.post('/create',isAuth,createWord)
router.patch('/update/:wordId',updateWord)


export default router
