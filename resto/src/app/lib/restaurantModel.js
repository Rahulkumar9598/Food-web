import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  city:{
    type:String
  },
  address:{
    type:String
  },
  contact:{
    type:String
  }
});

export const Restaurants =   mongoose.models.restaurants ||
  mongoose.model("restaurants", restaurantSchema);