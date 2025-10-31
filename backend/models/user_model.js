// User model - emptied as requested
import mongoose from "mongoose";

// Empty schema
const userSchema = new mongoose.Schema({});

export const User = mongoose.model("User", userSchema);