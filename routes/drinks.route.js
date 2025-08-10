
import express from "express";
import multer from "multer";
import { createdrink, getDrinks, deleteDrink } from "../controllers/drink.controller.js";
const router = express.Router();
// multer storage -> uploads/ folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });
router.get("/", getDrinks);         
router.post("/", upload.single("image"), createdrink);
router.delete("/:id", deleteDrink); 
export default router;
