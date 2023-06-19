import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products:[{
        product:{
        type:   mongoose.Schema.Types.ObjectId,
        ref: 'products',
        require: false,
        unique: true
    },
    quantity: {
      type: Number,
      min: 0
    }
    }]
})

export const cartModel = mongoose.model('carts' , cartSchema)