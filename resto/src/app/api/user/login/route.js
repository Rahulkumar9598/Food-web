import { connectionStr } from "@/app/lib/db";
import { User } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json()
    console.log(payload , " this is payload form the login api")
    let success = false;
    await mongoose.connect(connectionStr)

    let result = await User.findOne({ email: payload.email, password: payload.password })
    console.log(result , " this is result of login api ")
    if (result) {
        success = true;
    }

    return NextResponse.json({ result, success })

}