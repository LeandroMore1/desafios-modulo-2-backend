import { Router } from "express";
import { cartModel } from "../models/cart.model.js";

const cartRouter = Router()

cartRouter.use('/:cid',(req,res)=>{
    
})

export default cartRouter