import { connnectionStr } from "@/app/lib/db";
import { rastaurantSchema } from "@/app/lib/rastaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    const data = await rastaurantSchema.find()
    console.log(data)
    return NextResponse.json({result:data})
}

export async function POST(req){
    let payload = await req.json()
    let success = false;
    let result;
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    if(payload.login){
        result = await rastaurantSchema.findOne({email:payload.email,password:payload.password})
        if(result){
            success=true
        }
    } else {
        const rastaurant = new rastaurantSchema(payload)
        result = await rastaurant.save()
        if(result){
            success=true
        }
    }
    return NextResponse.json({result,success})
} 