require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { handleErrors } = require("./middlewares/ErrorHandler");
const authRoutes = require("./routes/authRoutes");
const raceRouter = require("./routes/RaceRoutes");
const driverRouter = require("./routes/DriverRoutes");
const betRouter = require("./routes/BetRoutes");
const userRouter = require("./routes/UserRoutes");

const port = process.env.PORT || 9000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(handleErrors);

connectDB();

app.use("/auth", authRoutes);
app.use("/races", raceRouter);
app.use("/drivers", driverRouter);
app.use("/bet", betRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Connected to port " + port);
});
