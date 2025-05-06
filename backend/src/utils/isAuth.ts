import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../types/AppError.js";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserRequest } from "../types/app-request.js";


const isAuth = (req: UserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if(!authHeader){
    throw new ValidationError('Not Authenticated',[],401);
  } 
  const token = authHeader.split(' ')[1];
  let decodedPayload;
  try{
     decodedPayload = jwt.verify(token,process.env.JWT_SECRET_KEY as string) as JwtPayload;
  }catch(err){
    const error = new ValidationError("Couldn't Authenticate",[],401);
    next(error)
  }
  req.userId = decodedPayload?.userId
  next()
}

export default isAuth;