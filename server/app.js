require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const toDoRoutes = require("./routes/ToDoRoutes"); // Import ToDo routes
const { handleErrors } = require("./middlewares/ErrorHandler"); // // Import error handling middleware

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(handleErrors);

connectDB();

app.use("/auth", authRoutes);
app.use("/todo", toDoRoutes);

app.listen(port, () => {
  console.log("Connected to port " + port);
});
