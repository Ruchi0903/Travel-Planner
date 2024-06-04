import mongoose from "mongoose"

const TripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    destination: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    places: [{
        name: String,
        location: {
            lat: Number,
            lng: Number
        },
        notes: String,
        date: Date
    }]
});

const Trip = mongoose.model('Trip', TripSchema);

export default Trip;