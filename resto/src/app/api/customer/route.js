import { connectionStr } from "@/app/lib/db";
import { Restaurants } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    let queryParams = request.nextUrl.searchParams

    let filter = {}

    if (queryParams.get("location")) {
        let city = queryParams.get("location");
        filter = { city: { $regex: new RegExp(city, "i") } }
    console.log(filter , "ttttttttttttttttt")
        
    }
    else if (queryParams.get("restaurant")) {
        let name = queryParams.get("restaurant");
        filter = { name: { $regex: new RegExp(name, "i") } }
        
    }

    await mongoose.connect(connectionStr) 
    let result = await Restaurants.find(filter)
    console.log(result , "yyyyyyyyyyyyhhhh")

    return NextResponse.json({success:true , result})
}