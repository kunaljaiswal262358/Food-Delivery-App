import { NextResponse } from "next/server"
import { connnectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodModel"
import mongoose from "mongoose"

export async function GET(req , content){
    let _id = content.params.id
    let success = false
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    let result = await foodSchema.findOne({_id:_id})
    if(result){
        success = true
    }
    return NextResponse.json({result , success:true})
}

export async function PUT(req , content){
    let body = await req.json();
    let _id = content.params.id
    let success = false
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    console.log(body , _id)
    let result = await foodSchema.findOneAndUpdate({_id:_id},body)
    console.log(result)
    if(result){
        success = true
    }
    return NextResponse.json({result , success:true})
}