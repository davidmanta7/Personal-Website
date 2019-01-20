const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var listingSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    category: {
        type: String
    }
});
