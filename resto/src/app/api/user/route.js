import { connectionStr } from "@/app/lib/db";
import { User } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json()
    console.log(payload, " this is my payload ");

    let success = false;
    await mongoose.connect(connectionStr);

    let user = new User(payload)
    const result = await user.save()

    if (result) {
        success = true;
    }

    return NextResponse.json({result, success})


}