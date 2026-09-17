import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    city:String,
    adddres:String,
    phone:Number,

})

export const User = mongoose.model.users || mongoose.model("users" ,userSchema )
