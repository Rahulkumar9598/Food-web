import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    confirmPassword: String,
    city: String,
    address: String


})

export const User = mongoose.models.users || mongoose.model("users", userSchema)
