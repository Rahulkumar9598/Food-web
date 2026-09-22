import { connectionStr } from "@/app/lib/db";
import { Restaurants } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(connectionStr)
    let result = await Restaurants.find()
    result = result.map(item => item?.city?.charAt(0).toUpperCase() + item?.city?.slice(1))
    result = [...new  Set(result)]
   return NextResponse.json({success:true , result}) 
}