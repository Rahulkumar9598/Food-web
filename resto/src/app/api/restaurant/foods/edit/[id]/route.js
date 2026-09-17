import { connectionStr } from "@/app/lib/db"
import { Foods } from "@/app/lib/foodsModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request, content) {
    const params = await content.params
    console.log(params.id, " this is response")
    await mongoose.connect(connectionStr)
    let success = false
    const result = await Foods.findOne({ _id: params.id })
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })

}

export async function PUT(request, content) {
    const params = await content.params
    const payload = await request.json();

    console.log(payload, " this is response")
    const id = params.id;
    console.log(id , "jjjjjjjjjjjjjjjjjjj")
    let success = false;
    await mongoose.connect(connectionStr);
    const result = await Foods.findOneAndUpdate({_id:id }, payload);

    if(result){
      success = true  
    }
    return NextResponse.json({ result, success })
}
