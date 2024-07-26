import { NextResponse } from "next/server"
import { connnectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodModel"
import mongoose from "mongoose"

export async function POST(request){
    let data = await request.json()
    let success = false;
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    const newfood = new foodSchema(data)
    let result = await newfood.save()
    if(result){
        success = true
    }
    return NextResponse.json({result , success})
}