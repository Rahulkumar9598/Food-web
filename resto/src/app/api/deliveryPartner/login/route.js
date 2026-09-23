import { connectionStr } from "@/app/lib/db"
import { DeliveryPartners } from "@/app/lib/deliveryPartnerModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    const payload  = await request.json()
    console.log(payload , " this is payload of login")
    let success=false

    try {

    await mongoose.connect(connectionStr)
    const result = await DeliveryPartners.findOne({phone:payload.phone , password:payload.password})

    console.log(result , " this is my result")

    if(result){
        success=true;
    }

      return NextResponse.json({ success , result})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message:"Something went wrong",
            success:false
        })
        
    }
}