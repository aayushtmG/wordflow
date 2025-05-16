import CatchAsync from "../utils/CatchAsync";
import User from '../models/userModel.js'

export const updateUser = CatchAsync(async(req,res,next)=>{
  const {username,email} = req.body
  const user = await User.findById(req.userId);
  if(!user){
    throw new Error('User not found')
  }
  user.username = username
  user.email = email
  await user.save()

  res.status(200).json({
    message: 'Success',
  })
})
