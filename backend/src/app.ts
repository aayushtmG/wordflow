import express from 'express'
import router from './routes/index';
import { connectDatabase } from './utils/db';
import GlobalErrorHandler from './utils/GlobalErrorHandler';

const app = express();
app.use(express.json({limit: '10mb'}))
connectDatabase()



app.use('/api',router);
app.use(GlobalErrorHandler)

export default app
