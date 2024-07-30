const mongoose = require("mongoose");

const RaceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Race = mongoose.model("Race", RaceSchema);

module.exports = Race;