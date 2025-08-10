const mongoose = require('mongoose');
import { ImageModule } from "../models/drink.model.js";

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
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
const ImageModule = mongoose.model('Images', imageSchema);
module.exports = {ImageModule}