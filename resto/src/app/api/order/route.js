import { connectionStr } from "@/app/lib/db";
import { Order } from "@/app/lib/orderModel";
import { Restaurants } from "@/app/lib/restaurantModel";
import { User } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json()
    let success = false;
    console.log(payload?.collection, " this is my payload from the order now page")
    await mongoose.connect(connectionStr)
    const order = new Order(payload?.collection)
    const result = await order.save()
    if (result) {
        success = true
    }

    return NextResponse.json({ result, success })
}

export async function GET(request) {
    try {
        const userId = request.nextUrl.searchParams.get("id");
        let success = false;

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User id is required"
            });
        }

        await mongoose.connect(connectionStr)

        const orders = await Order.find({ user_id: userId })

        if (!orders.length) {
            return NextResponse.json({
                success: false,
                message: "No orders found"
            });
        }

        const restaurantIds = orders.map((order) => order.restaurantId)

        const restaurants = await Restaurants.find({ _id: { $in: restaurantIds } })
        console.log(restaurants, " restaurants")

        if (restaurants) {
            success = true;
        }
        return NextResponse.json({ success, result: restaurants })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        });
    }

}