
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import drinksRoute from "./routes/drinks.route.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/drinks", drinksRoute);
app.get("/", (req, res) => res.send("Server is running..."));
// connect to mongo
const DB_URI = process.env.MONGO_URI;
mongoose.connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

