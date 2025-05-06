import mongoose,{ Schema,model } from "mongoose"

export interface Word {
  id: string;
  term: string;
  definition: string;
  recognizedCount: number;
  failedCount: number;
  lastSeen?: Date;
  category?: string;
}
const wordSchema = new Schema({
    term: String,
    definition: String,
    recognizedCount: Number,
    failedCount: Number,
    category: String,
    lastSeen: Date,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
},{timestamps: true})


const Word = model('word',wordSchema);

export default Word
