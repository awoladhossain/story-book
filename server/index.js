import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./db/db.js";
import authRouter from "./routers/auth.router.js";
import travelRouter from "./routers/travel.router.js";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use("/uploads",express.static(path.join(__dirname,"./uploads")))
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// * api endpoints of auth
app.use("/api/auth", authRouter);
app.use("/api/travel", travelRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
