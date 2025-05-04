import { Response, Request, NextFunction } from "express"

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export default (func: AsyncFunction)=> (req: Request,res: Response, next: NextFunction)=>{
  func(req,res,next).catch(err=> {
    next(err)
  });
}

