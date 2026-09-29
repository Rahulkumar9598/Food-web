import { connectionStr } from "@/app/lib/db";
import { Foods } from "@/app/lib/foodsModel";
import { Restaurants } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    let queryParams = request.nextUrl.searchParams

    let filter = {}

    if (queryParams.get("location")) {
        let city = queryParams.get("location");
        filter = { city: { $regex: new RegExp(city, "i") } }

    }
    else if (queryParams.get("restaurant")) {
        let name = queryParams.get("restaurant");
        filter = { name: { $regex: new RegExp(name, "i") } }

    }

    await mongoose.connect(connectionStr)
    let restaurants = await Restaurants.find(filter)

    let result = []

    for (let item of restaurants) {

        let food = await Foods.findOne({
            restaurantId: item._id,
        });

        result.push({
            ...item.toObject(),
            foodImage: food?.image || "",
        });
    }
    return NextResponse.json({ success: true, result })
} 