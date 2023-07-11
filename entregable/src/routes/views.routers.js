import { Router } from "express"
import { productService } from "../services/product.service.js"
import { cartService } from "../services/cart.service.js"
import { userService } from "../services/user.service.js";
import { isAuth, isGuest } from "../middlewares/auth.middleware.js";



const router = Router()

router.get('/login',(req,res)=>{
    res.render('login', {title: "Iniciar Sesión"})
})

router.get('/profile',  async (req,res)=>{
    const  getUser = req.user
    const user = await userService.getUserByEmail(getUser.email)

    res.render('profile', 	{title: `Mi Perfil | ${user.name}`,
    user: user})
    
})

router.get('/register',(req,res)=>{
    res.render('register', {title: "Registrarse"})
})


// SECTION - obtener y renderizar productos en home.handlebars


router.get("/",async(req,res)=>{

    const products = await productService.getProducts()
    res.render('home',{products })
})


// SECTION - obtener y renderizar productos en tiempo real en realTimeProducts.handlebars


router.get("/realtimeproducts",(req,res)=>{
    res.render('realTimeProducts',{})
})


// SECTION - obtener y renderizar productos con mongoose en products.handlebars


router.get('/products', async (req,res)=>{

    const {limit, page, stock, category} = req.query
    const findCartId = await cartService.addCart()

    
    try{
        const products = await productService.getProductsByPagination(limit, page, stock, category)
        products.stock = stock
        products.category = category
        products.cartId = findCartId.toHexString()
        res.render('products',products)
    } catch(err){
        res.send(err)
    }

})

export default router