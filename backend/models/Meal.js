import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Meal", mealSchema);
