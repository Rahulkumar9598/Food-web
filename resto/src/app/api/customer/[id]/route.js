import { connectionStr } from "@/app/lib/db"
import { Foods } from "@/app/lib/foodsModel"
import { Restaurants } from "@/app/lib/restaurantModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request, content) {
    const params = await content.params
    const id = params.id
    await mongoose.connect(connectionStr)
    const restaurantDetails = await Restaurants.findOne({_id:id})
    const foodItems = await Foods.find({restaurantId:id})
    return NextResponse.json({ success: true , restaurantDetails , foodItems})

} 
