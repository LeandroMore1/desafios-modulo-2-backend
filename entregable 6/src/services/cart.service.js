import { cartModel } from "../models/cart.model.js";
import { productService } from "./product.service.js";

class CartService {
    constructor(){
        this.model = cartModel
    }

    async addCart(){
        return await this.model.create()
    }

    async addProductToCart(cartId,productId){
        const product = await productService.findProductById(productId)
        const cart = await this.model.findOne( { _id: cartId } )
        cart.products.push(product)
        return await cart.save()
    }
}

export const cartService = new CartService()