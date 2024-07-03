import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    notes: {
        type: String
    },
    apiLocationId: {
        type: String
    }
});

const Place = mongoose.model('Place', placeSchema);
export default Place;