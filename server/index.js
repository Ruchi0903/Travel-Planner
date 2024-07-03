import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/User.route.js";
import authRouter from "./routes/Auth.route.js";
import tripRouter from "./routes/Trip.route.js";
import cookieParser from 'cookie-parser';
import { GoogleGenerativeAI } from "@google/generative-ai"
import { chatBotHandler } from "./controllers/Chatbot.controller.js";
import cors from "cors";
import flights from './routes/Flight.route.js'
import bodyParser from "body-parser";

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to mongodb")
    })
    .catch((err) => {
        console.log(err)
    })

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());


// ROUTES
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/trip', tripRouter);
app.use('/api/chatbot', chatBotHandler);

app.use('/api/flights', flights);


// MIDDLEWARES
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY)


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})