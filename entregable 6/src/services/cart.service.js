import { cartModel } from "../models/cart.model.js";
import { productService } from "./product.service.js";

class CartService {
    constructor(){
        this.model = cartModel
    }

    // async addToCart(productId){
    //     const lastCart = await this.model.findOne().sort({ _id: -1 })
    //     if(lastCart){
    //         const product = await productService.findProductById(productId)
    //         lastCart.products.push({product: product, quantity: ++1})
    //     }
    // }

    async addCart(){
        const lastCart = await this.model.findOne().sort({ _id: -1 }).lean()
        if(!lastCart){
            // const newCart = await this.model.create();
            // const cartId = newCart._id; 
            // return cartId;
            const newCart = new this.model();
            const savedCart = await newCart.save();
            const cartId = savedCart._id; 
            return cartId
        } else {
            const lastCartId = lastCart._id
            return lastCartId
        }
    }

    async getActualCart(){
        const lastCart = await this.model.findOne().sort({ _id: -1 })
        return  lastCart.id
    }

    async addProductToCart(cartId,productId){
        const product = await productService.findProductById(productId)
        const cart = await this.model.findOne( { _id: cartId } )
        cart.products.push(product)
        return await cart.save()
    }
}

export const cartService = new CartService()