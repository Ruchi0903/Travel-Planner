import express from "express";
import { addPlaceToTrip, createTrip, searchPlaces } from "../controllers/Trip.controller.js";

const router = express.Router();

router.post("/new-trip", createTrip);
router.get("/trips/places", searchPlaces);
router.post("/trips/places", addPlaceToTrip);

export default router;