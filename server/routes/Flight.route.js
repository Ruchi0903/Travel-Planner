import express from "express";
import { searchFlights } from "../controllers/Flight.controller.js";


const router = express.Router();

router.get('/search-one-way', searchFlights);

export default router;