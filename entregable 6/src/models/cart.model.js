import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products:[{
        type:  mongoose.ObjectId,
        ref: 'products',
        require: false
    }]
})

export const cartModel = mongoose.model('carts' , cartSchema)