import { Router } from "express";
import { cartService } from "../services/cart.service.js";


const cartRouter = Router()

// SECTION - Obtener y renderizar productos 


cartRouter.get('/:cid', async (req,res)=>{

  const cid = req.params.cid
    const data = await cartService.getProductsInCart()
    const cartData = data.flatMap(item => item.products.map(product => {
        return {
          product: product.product,
          quantity: product.quantity
        };
      }));
    res.render('cart',{cartData,cid})
})


// SECTION - Agregar producto al cart


cartRouter.put('/:cid', async (req,res)=>{
    const product = req.body.prodId
    const cid = req.params.cid
    const prod = await cartService.addProductToCart(cid,product)
    
    res.status(200).send("Product added to cart successfully")
})


// SECTION - actualizar quantity del producto


cartRouter.put('/:cid/products/:pid', async (req,res)=>{
  const cid = req.body.cartId
  const pid = req.body.prodId
  const qty = req.body.qty
  const actualVal = req.body.actVal

  const update = await cartService.updateQuantity(cid, pid, qty, actualVal)
  
  res.send(update)
})


// SECTION - Borrar producto del cart


cartRouter.delete('/:cid/products/:pid', async (req,res)=>{

  const cid = req.body.cartId
  const pid = req.body.prodId
  const deleteProduct = await cartService.deleteProduct(cid,pid)

  res.status(200).send(deleteProduct)
})


// SECTION - vaciar el cart


cartRouter.delete('/:cid', async (req,res)=>{
  const cid = req.params.cid
  const deleteCart = cartService.emptyCart(cid)
  res.status(200).send(deleteCart)
})

export default cartRouter