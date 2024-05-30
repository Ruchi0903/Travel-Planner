import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/User.route.js";
import authRouter from "./routes/Auth.route.js"

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


// ROUTES
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


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


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})