import { connnectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/orderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(req , content) {
    let id = content.params.orderId;
    let status = await req.json()
    let success = false
    await mongoose.connect(connnectionStr , {useNewUrlParser:true})
    const result = await orderSchema.findOneAndUpdate({_id:id} , {status : status})
    if(result){
        success = true
    }
    return NextResponse.json({result , success})
}