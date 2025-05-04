import mongoose from "mongoose";
import { DB_URI } from "../config.js";

export const connectDatabase = function(){
  mongoose.connect(DB_URI as string).then(result => console.log('conntected database')).catch(err => console.log(err))
}