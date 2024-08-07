import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from "./routes/User.route.js";
import authRouter from "./routes/Auth.route.js";
import tripRouter from "./routes/Trip.route.js";
import { chatBotHandler } from "./controllers/Chatbot.controller.js";
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
const port = process.env.PORT || 8000; // Make sure this port matches your backend server port

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/trip', tripRouter); // Ensure this is correctly mapped
app.use('/api/chatbot', chatBotHandler);

// MIDDLEWARES
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
