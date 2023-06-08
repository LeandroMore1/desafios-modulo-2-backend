import { Router } from "express"
import { productService } from "../services/product.service.js"

// const products = productService.getProducts()
// console.log(products)
const router = Router()

router.get("/",async(req,res)=>{
    const products = await productService.getProducts()
    res.render('home',{products})
})

router.get("/realtimeproducts",(req,res)=>{
    res.render('realTimeProducts',{})
})

router.get('/products', async (req,res)=>{
    try{
        const products = await productService.getProducts()
        res.render('products',{products})
    } catch(err){
        res.send(err)
    }
})

export default router