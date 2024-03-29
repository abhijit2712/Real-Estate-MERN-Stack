import express from 'express';
const app = express();
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import { authMiddelwares } from './middlerwares/authMiddlerware.js';
import cookieParser from 'cookie-parser';

//configure env
dotenv.config();

connectDB();

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
})

//to use json as an input
app.use(express.json()); 
app.use(cookieParser());

app.use("/api/user" ,userRouter);
app.use("/api/auth", authRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;

    const message = err.message || 'Internal Server  Error';

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
