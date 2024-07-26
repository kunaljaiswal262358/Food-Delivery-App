const { default: mongoose }= require("mongoose");

const orderModel = new mongoose.Schema({
    user_id:mongoose.Schema.Types.ObjectId,
    rasto_id:mongoose.Schema.Types.ObjectId,
    foodIds:String,
    deliveryBoy_id:mongoose.Schema.Types.ObjectId,
    status:String,
    amount:Number,
})

export const orderSchema = mongoose.models.orders || mongoose.model("orders" , orderModel);