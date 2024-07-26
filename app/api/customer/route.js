import { connnectionStr } from "@/app/lib/db";
import { rastaurantSchema } from "@/app/lib/rastaurantModel";
import rastaurant from "@/app/rastaurant/page";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    let queryParams = request.nextUrl.searchParams
    console.log(queryParams.get('location'))
    console.log(queryParams.get('rastaurant'))
    await mongoose.connect(connnectionStr,{useNewUrlParser:true})
    let filter = {}
    if(queryParams.get('location') && queryParams.get('rastaurant')){
        let city = queryParams.get('location')
        let rastaurant = queryParams.get('rastaurant')
        filter = {city :{$regex : new RegExp(city ,"i")} , rastoName :{$regex : new RegExp(rastaurant ,"i")}}
        console.log(filter)
    } else if(queryParams.get('location')){
        let city = queryParams.get('location')
        filter = {city :{$regex : new RegExp(city ,"i")}}
    } else if(queryParams.get('rastaurant')){
        let rastaurant = queryParams.get('rastaurant')
        filter = {rastoName :{$regex : new RegExp(rastaurant ,"i")}}
    }
    const result = await rastaurantSchema.find(filter)
    return NextResponse.json({result,success:true})
}