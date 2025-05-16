import express from 'express'
import router from './routes/index';
import { connectDatabase } from './utils/db';
import GlobalErrorHandler from './utils/GlobalErrorHandler';

const app = express();
app.use(express.json({limit: '10mb'}))
connectDatabase()


app.use((req,res,next)=>{
   res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    next();
})




app.use('/api',router);
app.use(GlobalErrorHandler)

export default app
