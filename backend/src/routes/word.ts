import express from 'express'
import {createWord,updateWord,getWords} from '../controllers/wordController'
import isAuth from '../utils/isAuth'
const router = express.Router()


router.get('/',isAuth,getWords);
router.post('/create',isAuth,createWord)
router.patch('/update/:wordId',updateWord)


export default router
