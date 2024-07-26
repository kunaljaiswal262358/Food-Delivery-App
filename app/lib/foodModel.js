import mongoose from "mongoose"

const foodModel = new mongoose.Schema({
    name: String,
    price: Number,
    imagePath: String,
    description: String,
    rasto_id: mongoose.Schema.Types.ObjectId,
})

export const foodSchema = mongoose.models.foods ||  mongoose.model("foods",foodModel)