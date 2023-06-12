import { Router } from "express";
import { cartService } from "../services/cart.service.js";

// const products = JSON.parse(localStorage.getItem('products'))

const cartRouter = Router()

cartRouter.get('/:cid', async (req,res)=>{
    
    const data = await cartService.getProductsInCart()
    const newData = JSON.stringify(data, null, '\t')
    const productFields = data.flatMap(item => item.products.map(product => {
        return {
          product: product.product,
          quantity: product.quantity
        };
      }));
      console.log(productFields)
    res.render('cart',{productFields})
})

cartRouter.put('/:cid', async (req,res)=>{
    const product = req.body.prodId
    const cid = req.params.cid
    const prod = await cartService.addProductToCart(cid,product)
    
    
    console.log(product)
    res.status(200).send("Product added to cart successfully")
})

export default cartRouter