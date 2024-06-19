import Meal from "../models/Meal.js";

export const addMeal = async (req, res) => {
  const { name, date, user } = req.body;
  try {
    // Create and save the meal with only the name, date, and user
    const meal = new Meal({ name, date, user });
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    console.error("Error in addMeal:", error); // Detailed logging
    res.status(500).json({ error: error.message });
  }
};

export const getMealsByDate = async (req, res) => {
  const date = new Date(req.params.date);
  const user = req.params.user;
  try {
    const meals = await Meal.find({ date, user });
    res.status(200).json(meals);
  } catch (error) {
    console.error("Error in getMealsByDate:", error); // Detailed logging
    res.status(500).json({ error: error.message });
  }
};
