const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ListingSchema = new mongoose.Schema({
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
        type: String,
        required: true
    }
});

module.exports = Listing = mongoose.model('listing', ListingSchema)
