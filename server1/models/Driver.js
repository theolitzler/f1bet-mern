const mongoose= require("mongoose");

const DriverSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    team: {
        type: String,
        required: true
    }
}, { timestamps: false });

const Driver = mongoose.model("Driver", DriverSchema);

module.exports = Driver;