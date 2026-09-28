// import mongoose from "mongoose";
// import { connectionStr } from "@/app/lib/db";
// import { Foods } from "@/app/lib/foodsModel";
// import { NextResponse } from "next/server";

// export async function POST(req){
//  const payload =  await req.json();
//  let success= false;
//  console.log(payload , " this is payload form the add food ")
 
//  await mongoose.connect(connectionStr);
//  const food = new Foods(payload);
//  const result = await food.save();
//  if(result){
//     success=true
//  }
//  return NextResponse.json({result , success})
// }
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { Foods } from "@/app/lib/foodsModel";
import cloudinary from "@/app/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  let success = false;

  try {
    await mongoose.connect(connectionStr);

    const data = await req.formData();

    const name = data.get("name");
    const price = data.get("price");
    const description = data.get("description");
    const restaurantId = data.get("restaurantId");
    const image = data.get("image");

    console.log(name, price, description, restaurantId, image);

    // Image Cloudinary par upload
    const buffer = Buffer.from(await image.arrayBuffer());

    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "restaurant-foods" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    // MongoDB
    const food = new Foods({
      name: name,
      price: price,
      description: description,
      restaurantId: restaurantId,
      image: upload.secure_url,
    });

    const result = await food.save();

    if (result) {
      success = true;
    }

    return NextResponse.json({
      result,
      success,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      error: "Food not added",
    });
  }
}
