import { Drinks } from "../models/drink.model.js";
import fs from "fs";
import path from "path";
// Create new drink
export const createdrink = async (req, res) => {
  try {
    const { title, price, details, location, url } = req.body;
    // Pick image path — either uploaded file or provided URL
    let imageUrl = url;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    if (!imageUrl) {
      return res.status(400).json({ error: "Image file or URL is required" });
    }
    const newDrink = new Drinks({
      title,
      price: Number(price),
      details,
      location,
      url: imageUrl
    });
    const saved = await newDrink.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating drink:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get all drinks
export const getDrinks = async (req, res) => {
  try {
    const drinks = await Drinks.find().sort({ _id: -1 });
    res.status(200).json(drinks);
  } catch (error) {
    console.error("Error fetching drinks:", error);
    res.status(500).json({ error: "Failed to fetch drinks" });
  }
};
// Delete drink by id and remove image file
export const deleteDrink = async (req, res) => {
  try {
    const { id } = req.params;
    const drink = await Drinks.findById(id);
    if (!drink) return res.status(404).json({ error: "Drink not found" });
    // Delete file if it is from uploads
    if (drink.url && drink.url.startsWith("/uploads/")) {
      const filepath = path.join(process.cwd(), drink.url);
      fs.unlink(filepath, (err) => {
        if (err) console.warn("Could not delete file:", filepath, err.message);
      });
    }
    await Drinks.findByIdAndDelete(id);
    res.json({ message: "Drink deleted" });
  } catch (error) {
    console.error("Error deleting drink:", error);
    res.status(500).json({ error: "Failed to delete drink" });
  }
};
