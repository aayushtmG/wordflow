import express from 'express'
import router from './routes/index.js';
import { connectDatabase } from './utils/db.js';
import GlobalErrorHandler from './utils/GlobalErrorHandler.js';

const app = express();
app.use(express.json({limit: '10mb'}))
connectDatabase()


app.use('/',router);
app.use(GlobalErrorHandler)

export default app
