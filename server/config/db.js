require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to MongoDB database successfully!");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
}

module.exports = connectDB;