import { connnectionStr } from "@/app/lib/db"
import { orderSchema } from "@/app/lib/orderModel"
import { rastaurantSchema } from "@/app/lib/rastaurantModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(req) {
    let _id = req.nextUrl.searchParams.get('id')
    let success = false
    await mongoose.connect(connnectionStr, { useNewUrlParser: true })
    let result = await orderSchema.find({ user_id: _id })
    if (result) {
        if (result) {
            let rasto_data = await Promise.all(
                result.map(async (item) => {
                    let rasto_info = {}
                    rasto_info.data = await rastaurantSchema.findOne({ _id: item.rasto_id })
                    rasto_info.status = item.status
                    rasto_info.amount = item.amount
                    return rasto_info
                })
            )
            result = rasto_data
            success = true
        }
        return NextResponse.json({ result, success })
    }
}

export async function POST(req) {
    const payload = await req.json()
    let success = false
    await mongoose.connect(connnectionStr, { useNewUrlParser: true })
    const orders = new orderSchema(payload)
    const result = await orders.save()
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}
