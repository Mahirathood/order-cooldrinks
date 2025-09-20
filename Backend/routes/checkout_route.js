// checkout_router
import express from "express";
import { Drinks } from "../drink_model.js";
const router = express.Router();
router.post("/api/checkout", async (req, res) => {
  const cartItems = req.body.cart;
  try {const updatedItems = [];
    for (let item of cartItems) {
      if (!item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          error: `Invalid quantity for item: ${item.title || item.id || item._id}`,});}
      let drink;
      const drinkId = item.id || item._id;
      if (drinkId) {drink = await Drinks.findByIdAndUpdate(
          drinkId,
          { $inc: { sold: item.quantity } },
          { new: true });
     } else if (item.title) {
        drink = await Drinks.findOneAndUpdate(
          { title: new RegExp("^" + item.title + "$", "i") },
          { $inc: { sold: item.quantity } },
          { new: true } ); }
      if (drink) {
        updatedItems.push(drink);}}
    res.json({
      success: true,
      message: "Checkout complete",
      updated: updatedItems,});
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ success: false, error: err.message });}});
export default router;
