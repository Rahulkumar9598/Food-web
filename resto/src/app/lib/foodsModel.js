import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

  name: {
    type: String,
  },

  price: {
    type: Number,
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String,
  },

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
  },

});

export const Foods =
  mongoose.models.foods ||
  mongoose.model("foods", foodSchema);