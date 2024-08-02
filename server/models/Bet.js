const mongoose= require("mongoose");

const BetSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    raceId: {
        type: String,
        required: true
    },
    prediction: {
        type: Object,
        required: true
    },
    isFinal: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Bet = mongoose.model("Bet", BetSchema);

module.exports = Bet;