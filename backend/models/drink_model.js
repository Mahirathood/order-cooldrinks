import mongoose from "mongoose";

const drinksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  details: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  image: { 
    type: String, 
    required: true 
  },
  sold: { 
    type: Number, 
    default: 0 
  },
});

export const Drinks = mongoose.model("Drink", drinksSchema);