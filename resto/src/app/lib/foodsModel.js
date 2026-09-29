import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

  name: {
    type: String,
    required:true
  },

  price: {
    type: Number,
    required:true

  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required:true

  },
  category:{
    type:String,
    required:true

  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
  },

});

export const Foods =
  mongoose.models.foods ||
  mongoose.model("foods", foodSchema);