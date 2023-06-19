import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

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
            required: true,
            enum: ['instruments','accesories','electronics']
        }
        
    }
)

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model('products', productSchema)