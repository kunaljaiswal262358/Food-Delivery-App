import { connnectionStr } from "@/app/lib/db"
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartner"
import mongoose from "mongoose"
import { NextResponse } from "next/server";

export async function GET(req , content){
    let city = content.params.city;
    let success = false
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    let filter = {}
    filter = {city : {$regex : new RegExp(city , "i")}}
    const result = await deliveryPartnerSchema.find(filter)  
    const ids = result.map(item=>item._id)  
    if(result){
        success = true
    }
    return NextResponse.json({ids , success })
}