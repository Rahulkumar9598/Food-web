import { connectionStr } from "@/app/lib/db"
import { DeliveryPartners } from "@/app/lib/deliveryPartnerModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request, content) {
    const params = await content.params
    let city = params.city
    console.log(city, " this is params")

    try {
        let success = false
        await mongoose.connect(connectionStr)
        let filter = { city: { $regex: new RegExp(city, "i") } }
        let result = await DeliveryPartners.find(filter)
        console.log(result, " this is response ")

        if (result) {
            success = true
        }
        return NextResponse.json({ result, success })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Something went wrong",
            success: false
        })


    }

}