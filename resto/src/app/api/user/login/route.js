// import { connectionStr } from "@/app/lib/db";
// import { User } from "@/app/lib/userModel";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//     const payload = await request.json()
//     console.log(payload , " this is payload form the login api")
//     let success = false;
//     await mongoose.connect(connectionStr)

//     let result = await User.findOne({ email: payload.email, password: payload.password })
//     console.log(result , " this is result of login api ")
//     if (result) {
//         success = true;
//     }

//     return NextResponse.json({ result, success })

// }

import { connectionStr } from "@/app/lib/db";
import { User } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const payload = await request.json();

        console.log(payload, "this is payload from login api");

        await mongoose.connect(connectionStr);

        const result = await User.findOne({
            email: payload.email,
            password: payload.password
        });

        console.log(result, "this is result of login api");

        if (!result) {
            return NextResponse.json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // JWT token
        const token = jwt.sign(
            {
                userId: result._id,
                email: result.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return NextResponse.json({
            success: true,
            token,
            result
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);

        return NextResponse.json({
            success: false,
            message: "Something went wrong",
            error: error.message
        }, {
            status: 500
        });
    }
}