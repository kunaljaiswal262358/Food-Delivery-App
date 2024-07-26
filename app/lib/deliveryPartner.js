const { default: mongoose } = require("mongoose");

const deliveryPartnersModel = new mongoose.Schema({
    name: String,
    mobile:Number,
    address:String,
    city:String,
    password:String,
})

export const deliveryPartnerSchema = mongoose.models.deliveryPartners || mongoose.model("deliveryPartners" , deliveryPartnersModel)