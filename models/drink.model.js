import mongoose from "mongoose";

const drinksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: 0
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
  url:{
    type:String,
    required:true,
  }
});

export const Drinks = mongoose.model("Drink", drinksSchema);