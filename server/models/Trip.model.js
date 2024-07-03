import mongoose from "mongoose"

const TripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requried: true,
    },
    destination: {
        type: String,
        requried: true,
    },
    startDate: {
        type: Date,
        requierd: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    }]
});

const Trip = mongoose.model('Trip', TripSchema);

export default Trip;