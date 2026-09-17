import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { Foods } from "@/app/lib/foodsModel";
import { NextResponse } from "next/server";

export async function POST(req){
 const payload =  await req.json();
 let success= false;
 console.log(payload , " this is payload form the add food ")
 
 await mongoose.connect(connectionStr);
 const food = new Foods(payload);
 const result = await food.save();
 if(result){
    success=true
 }
 return NextResponse.json({result , success})
}