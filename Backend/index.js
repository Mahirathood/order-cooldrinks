
// Backend/index.js
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import drinksRoute from "./routes/drink_route.js";
import checkoutRoute from "./routes/checkout_route.js";
import authRoute from "./routes/auth_route.js"; // login + register

// Load environment variables
dotenv.config({ path: join(process.cwd(), ".env") });
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/drinks", drinksRoute);
app.use(checkoutRoute);

// Serve uploads folder (images)
app.use("/uploads", express.static(join(__dirname, "../uploads")));

// Serve frontend static files
app.use(express.static(join(__dirname, "../Frontend")));
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../Frontend/index.html"));
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
connectDB();

// Start server
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => console.log(`Server running at http://127.0.0.1:${PORT}`));
