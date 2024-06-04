import express from "express";
import { createTrip } from "../controllers/Trip.controller.js";

const router = express.Router();

router.post("/new-trip", createTrip);

export default router;