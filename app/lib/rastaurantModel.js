import mongoose from "mongoose";

const rastaurantModel = new mongoose.Schema({
    name:String,
    email:String,  
    password:Number,  
    varifPass:Number,  
    rastoName:String,  
    city:String,  
    contact:Number,   
    address:String,   
});

export const rastaurantSchema = mongoose.models.rastaurants
|| mongoose.model("rastaurants",rastaurantModel);