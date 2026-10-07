import { connectionStr } from "@/app/lib/db";
import { User } from "@/app/lib/userModel";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // 1. Authorization header se token nikalo
        const authHeader = request.headers.get("authorization");
        console.log(authHeader , " this is auth header token")

        if (!authHeader) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Token not found",
                },
                { status: 401 }
            );
        }

        // 2. Bearer token se actual token nikalo
        const token = authHeader.split(" ")[1];
        console.log(token , " token from api/use/me routes")

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid token",
                },
                { status: 401 }
            );
        }

        // 3. Token verify karo
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log(decoded, "decoded token");

        // 4. Database connect
        await mongoose.connect(connectionStr);

        // 5. Token ke userId se user nikalo
        const user = await User.findById(decoded.userId)
            .select("-password -confirmPassword");

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // 6. User frontend ko return
        return NextResponse.json({
            success: true,
            result: user,
        });

    } catch (error) {
        console.log("ME API ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Invalid or expired token",
            },
            { status: 401 }
        );
    }
}