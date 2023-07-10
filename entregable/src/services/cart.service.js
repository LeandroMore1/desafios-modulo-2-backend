import { cartModel } from "../models/cart.model.js";
import { userService } from "./user.service.js";


class CartService {
    constructor() {
        this.model = cartModel
    }
    
    
    
    

    async addCart() {
        const lastCart = await this.model.findOne().sort({ _id: -1 }).lean()
        if (!lastCart) {

            const newCart = new this.model();
            const savedCart = await newCart.save();
            const cartId = savedCart._id;
            
            return cartId
        } else {
            const lastCartId = lastCart._id
            return lastCartId
        }
    }

    async getProductsInCart() {
        const data = await this.model.find().lean().populate('products.product');
        return data
    }

    async getActualCart() {
        const lastCart = await this.model.findOne().sort({ _id: -1 })
        return lastCart.id
    }



    async addProductToCart(cartId, product) {

        const findCart = await this.model.findOne({ _id: cartId })
        const find = findCart.products.findIndex(el => el.product.toHexString() === product)
        if (find === -1) {
            const cart = await this.model.findOneAndUpdate({ _id: cartId },
                { $addToSet: { products: { product: product, quantity: 1 } } })
            return cart
        }
    }

    async emptyCart(cartId){

        await this.model.updateOne(
            { _id: cartId },
            { $set: { products: [] } }
         )
    }

    async updateQuantity(cartId, prodId, qty, actualValue){

    await this.model.updateOne(
        { "_id": cartId, "products.product": prodId },
        { $set: { "products.$.quantity": qty >= 0 ? qty : actualValue} })
    }
   

    async deleteProduct(cartId, prodId){

    await this.model.updateOne(
            { _id: cartId },
            { $pull: { products: { product: prodId } } }
            )

    }

    async findCartById(id) {
        const cartId = await this.model.findOne({ _id: id })
        return cartId
    }
}

export const cartService = new CartService()