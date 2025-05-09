import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import authRouter from "./routers/auth.router.js";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// * api endpoints of auth

app.use("/api/auth", authRouter);
app.listen(PORT, () => {
  console.log("Server is running on port",PORT);
});
