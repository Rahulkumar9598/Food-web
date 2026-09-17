import { connectionStr } from "@/app/lib/db";
import { Foods } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const params = await content.params;
    const restaurantId = params.id;
    let success = false;
    await mongoose.connect(connectionStr)
    const result = await Foods.find({ restaurantId })
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}

export async function DELETE(request , content){
    const params = await content.params
    const id = params?.id
    console.log(id , " this is id llllllll")
    let success=false;
    await mongoose.connect(connectionStr)
    const result = await Foods.deleteOne({_id:id})
    if(result){
        success= true

    }
    return NextResponse.json({result , success})

}