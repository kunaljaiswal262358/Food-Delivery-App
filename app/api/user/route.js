import { connnectionStr } from "@/app/lib/db"
import { userSchema } from "@/app/lib/userModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req){
    const payload = await req.json()
    let success = false
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    const newUser = new userSchema(payload)
    const result = await newUser.save()
    if(result){
        success = true
    }
    return NextResponse.json({result , success})
}