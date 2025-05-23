import { NextFunction, Request, Response } from "express";
import {ValidationError } from "../types/AppError";


const GlobalErrorHandler = (error: any,req: Request,res: Response,next: NextFunction)=>{
 const status = error instanceof ValidationError  ? error.code : 500;
    const message = error.message || 'Something went wrong'
 const data = error instanceof ValidationError ? error.data : []
 res.status(status).json({message, data})
}

export default GlobalErrorHandler
