import { connectionStr } from "@/app/lib/db"
import { Foods } from "@/app/lib/foodsModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    let category = searchParams.get("category")
    try {
        let success = false
        await mongoose.connect(connectionStr)
        if (category) {

            const result = await Foods.find({ category: category })
            if (result) {
                success = true
            }
            return NextResponse.json({ result, success })
        } else {
            const result = await Foods.find()
            if (result) {
                success = true
            }
            return NextResponse.json({ result, success })

        }


    } catch (error) {
        console.log(error)

    }

}