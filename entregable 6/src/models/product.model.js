import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true,
            unique: true
        },
        stock: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
        
    }
)

export const productModel = new mongoose.model('products', productSchema)