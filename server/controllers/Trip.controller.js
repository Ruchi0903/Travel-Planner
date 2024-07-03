import Place from "../models/Place.model.js";
import Trip from "../models/Trip.model.js";



const API_KEY = '5ae2e3f221c38a28845f05b6b923f28603277a70542c9f86340051df';
const BASE_URL = 'https://api.opentripmap.com/0.1/en/places'

export const createTrip = async (req, res) => {
    try {
        const { userId, destination, startDate, endDate } = req.body;
        const trip = new Trip({ userId, destination, startDate, endDate });
        await trip.save();
        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchPlaces = async (req, res) => {
    try {
        const { destination } = req.query;
        const response = await axios.get(`${BASE_URL}/geoname`, {
            params: { name: destination, apiKey: API_KEY }
        });
        const places = response.data;
        res.status(200).json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addPlaceToTrip = async (req, res) => {
    try {
        const { tripId, placeId } = req.body;
        const trip = await Trip.findById(tripId);
        if (!trip) return res.status(404).json({ messasge: 'Trip Not Found!' });

        const response = await axios.get(`${BASE_URL}/xid/${placeId}`, {
            params: { apiKey: API_KEY }
        });

        const placeData = response.data;

        const place = new Place({
            trip: tripId,
            name: placeData.name,
            location: {
                lat: placeData.point.lat,
                lng: placeData.point.lon
            },
            apiLocationId: placeId
        });

        await place.save();

        trip.places.push(place._id);
        await trip.save();

        res.status(201).json(place);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}