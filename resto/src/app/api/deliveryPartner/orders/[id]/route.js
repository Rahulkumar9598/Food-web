import { connectionStr } from "@/app/lib/db"
import { Order } from "@/app/lib/orderModel"
import { Restaurants } from "@/app/lib/restaurantModel"
import axios from "axios"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request, content) {
    const params = await content.params
    console.log(params)
    let deliveryBoy_id = params.id
    let success = false
    try {

        await mongoose.connect(connectionStr)
        let orders = await Order.find({ deliveryBoy_id: deliveryBoy_id })

        let result = []
        let status = orders.map((item) => item.status)
        let amount = orders.map((item) => item.amount)

        let restaurantIds = orders.map((order) => order.restaurantId)
        let restaurants = await Restaurants.find({ _id: { $in: restaurantIds } })

        result = orders.map((order) => {
            let restaurant = restaurants.find(
                (restaurant) => restaurant._id.toString() === order.restaurantId.toString());
            return {
                status: order.status,
                amount: order.amount,
                restaurant: restaurant
            }
        })

        if (result) {
            success = true;
        }
        return NextResponse.json({ success, result })
    } catch (error) {
        console.log(error)
    }

}