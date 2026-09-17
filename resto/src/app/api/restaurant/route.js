import { connectionStr } from "@/app/lib/db";
import { Restaurants } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        const data = await Restaurants.find();

        console.log(data, " this is data from database")

        return NextResponse.json({ result: data })

    } catch (error) {
        console.log(error, "this is error form the connection")

    }


}

export async function POST(req) {
    const payload = await req.json();
    console.log(payload, " this is body ")
    let result;
    let success=false;
    await mongoose.connect(connectionStr);

    console.log(" asgaghahgahaiejijrg")
    //this is for signup 
    if(payload.login) {
        result = await Restaurants.findOne({ email: payload.email, password: payload.password })
        if(result){
            success=true
        }
        console.log(result , " this is response from the backend")

        //this is for sign in
    } else {
        const restaurant = new Restaurants(payload)
        result = await restaurant.save();
        if(result){
            success=true
        }
        console.log(result, "kkkkkkkkkkkkkkkkkkkk")
    }
    return NextResponse.json({ result , success })

}

