
import { Drinks } from "../drink_model.js";
// CREATE
export const createDrink = async (req, res) => {
  try {
    const { title, price, details, location } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const newDrink = new Drinks({ title, price, details, location, image });
    await newDrink.save();
    res.status(201).json(newDrink);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// GET ALL
export const getDrinks = async (req, res) => {
  try {
    const drinks = await Drinks.find();
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// DELETE
export const deleteDrink = async (req, res) => {
  try {
    const drink = await Drinks.findByIdAndDelete(req.params.id);
    if (!drink) return res.status(404).json({ error: "Drink not found" });
    res.json({ message: "Drink deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
