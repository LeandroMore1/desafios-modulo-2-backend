import { Router } from "express"
import { productService } from "../services/product.service.js"



const router = Router()

router.get("/",async(req,res)=>{
    const products = await productService.getProducts()
    res.render('home',{products})
})

router.get("/realtimeproducts",(req,res)=>{
    res.render('realTimeProducts',{})
})

export default router