import mongoose from "mongoose";

// Empty schema
const drinksSchema = new mongoose.Schema({});

export const Drinks = mongoose.model("Drink", drinksSchema);
