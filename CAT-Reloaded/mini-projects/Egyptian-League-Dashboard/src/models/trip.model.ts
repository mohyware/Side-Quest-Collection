import mongoose, { Document } from "mongoose";

export interface Trip extends Document {
    departurePlace: string,
    destination: string,
    startingDate: Date,
    duration: Number,
    passengers: Number,
}

const TripSchema = new mongoose.Schema({
    departurePlace: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
})

export const Trip = mongoose.model("Trip", TripSchema);