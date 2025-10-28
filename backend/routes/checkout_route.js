import express from "express";
import { Drinks } from "../models/drink_model.js";

const router = express.Router();

// Process checkout
router.post("/api/checkout", async (req, res) => {
  try {
    const { cart } = req.body;
    
    if (!cart || cart.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Cart is empty" 
      });
    }
    
    // Calculate total
    let total = 0;
    const orderItems = [];
    
    // Process each item in cart
    for (const item of cart) {
      const drink = await Drinks.findById(item._id);
      if (drink) {
        // Update sold count
        drink.sold += item.quantity;
        await drink.save();
        
        // Add to order
        const itemTotal = drink.price * item.quantity;
        total += itemTotal;
        
        orderItems.push({
          drinkId: drink._id,
          title: drink.title,
          price: drink.price,
          quantity: item.quantity,
          subtotal: itemTotal
        });
      }
    }
    
    // Generate order number
    const orderNumber = 'ORD-' + Date.now();
    
    // In a real app, you would save this order to database
    const order = {
      orderNumber,
      items: orderItems,
      total,
      date: new Date(),
      status: 'confirmed'
    };
    
    res.json({
      success: true,
      message: `Order ${orderNumber} placed successfully!`,
      order
    });
    
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: "Checkout failed. Please try again."
    });
  }
});

export default router;