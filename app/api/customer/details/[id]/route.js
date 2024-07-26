import { connnectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModel";
import { rastaurantSchema } from "@/app/lib/rastaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET( req , content){
    let id = content.params.id
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    const rastoInfo = await rastaurantSchema.findOne({_id:id})
    const rastoFoods = await foodSchema.find({rasto_id:id})
    return NextResponse.json({success:true , rastoInfo , rastoFoods})
}