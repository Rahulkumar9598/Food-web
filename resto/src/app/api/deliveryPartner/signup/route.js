import { connectionStr } from "@/app/lib/db"
import { DeliveryPartners } from "@/app/lib/deliveryPartnerModel";
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const payload = await request.json()
        if (!payload) {

            return NextResponse.json({
                success: false,
                message: "payload required"
            });
        }
        

        if (!payload.name || !payload.email || !payload.phone || !payload.password || !payload.city || !payload.address) {
            return NextResponse.json({
                success: false,
                message: "All field are required"
            });
        }
        await mongoose.connect(connectionStr)
        let success = false;
        let result = new DeliveryPartners(payload)
        console.log(result)

        result = await result.save()
        console.log(result)

        if (result) {
            success = true;
        }
        return NextResponse.json({ success, result })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        });

    }


}
