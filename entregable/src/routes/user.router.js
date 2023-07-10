import { Router } from "express";
import passport from "passport";
import { cartService } from "../services/cart.service.js";
import { userService } from "../services/user.service.js";

const userRouter = Router()

userRouter.post("/",passport.authenticate('register',{failureRedirect: '/registererror'}),async(req,res)=>{
    res.redirect('/login');
})

userRouter.post('/logout', async (req, res )=>{
    req.session.destroy((err) => {
		if (!err) {
			res.redirect("/login");
		} else {
			res.status(500).send('Error al intentar salir de la sesion');
		}
	});
})

userRouter.post("/auth", passport.authenticate('login' , {failureRedirect: '/loginerror'}) ,async(req, res)=>{
    if (!req.user) return res.status(400).send('No user found')

        const user = req.user;
        const userId = user._id
        const cartId = await cartService.addCart()

		delete user.password;

		req.session.user = user;

        await userService.assignCartToUser(cartId,userId)

        if(user.role === "admin"){
            req.session.admin = true
        }
        
        res.redirect("/products")
})

export default userRouter