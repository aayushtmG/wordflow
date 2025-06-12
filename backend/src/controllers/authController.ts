import { NextFunction, Request, Response } from "express"
import User from "../models/userModel"
import validator from 'validator'
import CatchAsync from "../utils/CatchAsync";
import { ValidationError } from "../types/AppError";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type ErrorHolder = {message: string}[];

export const signup = CatchAsync(async(req: Request,res: Response,next: NextFunction)=>{
  const errors: ErrorHolder = [];
  const {username,email,password,confirmPassword} = req.body
  if(!email || !validator.isEmail(email)){
    errors.push({message: "Please provide valid email"})
  }
  if(!username || !validator.isLength(username,{min: 4})){
    errors.push({message: "Username should not be empty and minimum of 5 characters long "})
  }
  if(!password || !validator.isLength(password,{min: 5})){
    errors.push({message: "Password should not be empty and minimum of 5 characters long "})
  }
  if(password != confirmPassword){
    errors.push({message: "Password should be confirmed"})
  }

  if(errors.length > 0){
    const error =  new ValidationError('Invalid Input',errors,422)
    throw error
  } 
  const hashedPassword = await bcrypt.hash(password,12);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword
  })
  res.status(200).json({
    message: "Created User Successfully",
    user: newUser
  })
});

export const signin = CatchAsync(async(req: Request,res: Response,next: NextFunction)=>{
    console.log('reuesst recieved');
  const errors = []
  const {email,password} = req.body
  if(!validator.isEmail(email)){
    errors.push({message: "Please provide valid email"})
  }
  if(errors.length > 0){
    throw new ValidationError('Invalid Input',errors,422)
  } 
  const user = await User.findOne({email}) 
  if(!user){
     throw new ValidationError('Invalid Credentials',errors,422)
  }

  const passwordMatches = await bcrypt.compare(password,user?.password as string);
  if(!passwordMatches){
    throw new ValidationError('Invalid Credentials',errors,422)
  }

  const token = jwt.sign({
    email,
    userId: user._id.toString()
  },process.env.JWT_SECRET_KEY as string,{expiresIn: '1h'})

  res.status(200).json({ message: "login success ",
    user:{_id: user._id.toString(),email: user.email,username: user.username},
    token
  })
});




