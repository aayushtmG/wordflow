import CatchAsync from '../utils/CatchAsync.js'
import Word from '../models/wordModel.js'
import validator from 'validator'
import { ValidationError } from '../types/AppError.js';
import { UserRequest } from '../types/app-request.js';


export const getAll = CatchAsync(async (req,res)=>{
    const words = await Word.find();
    res.status(200).json({message: 'success',words})
})


export const createWord = CatchAsync(async(req: UserRequest,res,next)=>{
    const {term,definition} = req.body     
    if(!term || !definition){
        throw new ValidationError('Please provide all required fields',[],500)
    } 
    if(!req.userId){
        throw new ValidationError('Not logged in',[],422)
    }
    const newWord = await Word.create({
    term, 
    definition,
    creator: req.userId
    });
    res.status(200).json({message: 'success',newWord: {term: newWord.term, definition: newWord.definition}})
})

export const updateWord = CatchAsync(async(req:UserRequest,res,next)=>{
    const {wordId,term,definition} = req.body
    if(!term || !definition){
        throw new ValidationError('Please provide all required fields',[],500)
    } 

    const updatedWord = await Word.findByIdAndUpdate(wordId,{
    term, definition},{new:true});
    
    res.status(200).json({message: 'success',word: updatedWord})

})

export const deleteWord = CatchAsync(async(req: UserRequest,res,next)=>{
    const {id} = req.params
    const word = await Word.findById(id);
    if(!word){
        throw new ValidationError('Word not found',[],404)
    }
    if(word.creator.toString() != req.userId){
        throw new ValidationError('Not Authorized',[],422)
    }
    await word.deleteOne();
     res.status(200).json({
        message: 'Word deleted successfully',
      })   

})
