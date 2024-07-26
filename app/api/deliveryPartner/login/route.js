import { connnectionStr } from "@/app/lib/db"
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartner"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req){
    const payload = await req.json()
    console.log(payload)
    let success = false
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    const result = await deliveryPartnerSchema.findOne({mobile:payload.mobile , password:payload.password})
    if(result){
        success = true
    }
    return NextResponse.json({result , success})
}