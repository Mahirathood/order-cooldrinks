import express from "express";
import multer from "multer";
import { Drinks } from "../models/drink_model.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { authenticateToken } from "../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
const router = express.Router();

// POST new drink with image (requires authentication)
router.post("/", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const { title, price, details, location } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const drink = new Drinks({
      title,
      price,
      details,
      location,
      image
    });

    await drink.save();
    res.status(201).json(drink);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all drinks
router.get("/", async (req, res) => {
  try {
    const drinks = await Drinks.find();
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET top 10 trending drinks
router.get("/trending", async (req, res) => {
  try {
    const trending = await Drinks.find({ sold: { $gt: 0 } })
      .sort({ sold: -1 })
      .limit(10);
    res.json(trending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update sold count
router.post("/sold", async (req, res) => {
  try {
    const { title, quantity } = req.body;
    const drink = await Drinks.findOne({ title });

    if (!drink) return res.status(404).json({ error: "Drink not found" });

    drink.sold += Number(quantity);
    await drink.save();

    res.json({ message: "Sold count updated", drink });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;