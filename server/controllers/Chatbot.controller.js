import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

export const chatBotHandler = async (req, res, next) => {
    try {
        console.log("Request history:", req.body.history);
        console.log("Request message:", req.body.message);

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Validate the structure of the history array
        const history = req.body.history.map(item => ({
            role: item.role,
            parts: Array.isArray(item.parts) ? item.parts : [item.parts] // Ensure parts is always an array
        }));

        const chat = model.startChat({ history });

        const msg = req.body.message;

        const result = await chat.sendMessage(msg);
        const response = await result.response.text();

        console.log("Response from model:", response);

        res.json({ response });
    } catch (error) {
        console.error("Error in chatBotHandler:", error);
        res.status(500).json({ error: "Something went wrong! Please try again later." });
    }
};
