import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name:String,
    email:String,
    password:String, 
    address:String,
    city:String,
    mobile:Number,
});

export const userSchema = mongoose.models.users || mongoose.model("users" , userModel);