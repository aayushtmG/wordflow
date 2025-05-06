import { Request } from "express"

declare interface UserRequest extends Request{
  userId?: string 
}