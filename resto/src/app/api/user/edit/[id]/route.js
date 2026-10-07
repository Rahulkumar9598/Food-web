import { connectionStr } from "@/app/lib/db"
import { User } from "@/app/lib/userModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function PUT(request, content) {
    const params = await content.params
    const id = params.id
   
    const payload = await request.json()
    let success = false
    try {

        await mongoose.connect(connectionStr)
        const result = await User.findOneAndUpdate({_id: id } , payload ,{new:true})
        console.log(result, "result of update")

        if (result) {
            success = true
        } 
        return NextResponse.json({ result, success })

    } catch (error) {
        console.log(error)
         return NextResponse.json({
                message: "Something Went Wrong",
                success: false
            })
    }
}