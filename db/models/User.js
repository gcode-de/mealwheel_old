const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  weekdaysEnabled: [{ type: String }], // Array von Strings
  mealsPerDay: { type: Number, required: true },
  defaultNumberOfPeople: { type: Number, required: true },
  defaultDiet: [{ type: String }], // Optional, könnte auch spezifische Diät-Typen als Enum haben
  numberOfRandomMeals: { type: Number, required: true },
});

const recipeInteractionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "Recipe" }, // Verweist auf ein Rezept
  isFavorite: { type: Boolean, default: false },
  hasCooked: { type: Boolean, default: false },
  rating: { type: Number, required: true },
  notes: String, // Optional
});

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  settings: settingsSchema, // Verwendet das oben definierte Settings-Schema
  recipeInteractions: [recipeInteractionSchema], // Verwendet das oben definierte RecipeInteraction-Schema
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
