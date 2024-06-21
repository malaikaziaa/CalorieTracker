import express from "express";
import { addMeal, getMealsByDate } from "../controllers/mealController.js";

const router = express.Router();

router.post("/meals", addMeal);
router.get("/meals/:user/:date", getMealsByDate);

export default router;
