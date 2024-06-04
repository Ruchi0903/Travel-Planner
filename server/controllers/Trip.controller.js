import Trip from "../models/Trip.model.js"

export const createTrip = async (req, res, next) => {
    try {
        const { userId, destination, startDate, endDate, places } = req.body;
        const trip = await Trip.create({ userId, destination, startDate, endDate, places });

        res.status(400).json({ trip });

    } catch (error) {
        next(error);
    }
}