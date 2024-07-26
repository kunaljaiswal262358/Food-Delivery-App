import { connnectionStr } from "@/app/lib/db"
import { rastaurantSchema } from "@/app/lib/rastaurantModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(){
    let success =false
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    const rastaurants = await rastaurantSchema.find()
    let locations = rastaurants.map(item=>{
        return item.city.charAt(0).toUpperCase() + item.city.slice(1)
    })
    locations = [...new Set(locations.map(item=>item))]
    if(rastaurants){
        success = true
    }
    return NextResponse.json({locations, success})
}