import { connnectionStr } from "@/app/lib/db"
import { orderSchema } from "@/app/lib/orderModel"
import { rastaurantSchema } from "@/app/lib/rastaurantModel"
import { userSchema } from "@/app/lib/userModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(req, content) {
    let _id = content.params.id
    let success = false
    await mongoose.connect(connnectionStr, { useNewUrlParser: true })
    let result = await orderSchema.find({ deliveryBoy_id: _id , $or:[{ status: "confirm" }, {  status: "ongoing" }]})
    // $or: [{ status: status1 }, {  status: status2 }]
    if (result) {
        let rasto_data = await Promise.all(
            result.map(async (item) => {
                let rasto_info = {}
                rasto_info.data = await rastaurantSchema.findOne({ _id: item.rasto_id })
                rasto_info.userData = await userSchema.findOne({ _id: item.user_id })
                rasto_info.status = item.status
                rasto_info.amount = item.amount
                rasto_info.order_id = item._id
                return rasto_info
            })
        )
        result = rasto_data
        success = true
        return NextResponse.json({ result, success })
    }
}


