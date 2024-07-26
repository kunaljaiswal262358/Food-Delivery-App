import { NextResponse } from "next/server"
import { connnectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodModel"
import mongoose from "mongoose"

export async function GET(req , content){
    let _id = content.params.id
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    let result = await foodSchema.find({rasto_id:_id})
    return NextResponse.json({result , success:true})
}

export async function DELETE(req , content){
    let foodID = content.params.id
    console.log(foodID)
    let success = false
    await mongoose.connect(connnectionStr , {useNewUrlParser:true})
    const result = await foodSchema.deleteOne({_id:foodID})
    if(result){
        success = true
    }
    return NextResponse.json({result , success})
}