import { Router } from "express";
// import { userService } from "../services/user.service.js";
// import { hashPassword, comparePassword } from '../utils/encrypt.util.js';
import passport from "passport";

const userRouter = Router()

userRouter.post("/",passport.authenticate('register',{failureRedirect: '/registererror'}),async(req,res)=>{
    res.redirect('/login');
    // const user = { ...req.body, password: hashPassword(req.body.password) }
    // try{
    //     const newUser = await userService.createUser(user)
    //     delete newUser.password
    //     res.redirect("/login")
    // } catch (err){
    //     res.status(400).json({error: err.message} )
    // }
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

		delete user.password;

		req.session.user = user;

        if(user.role === "admin"){
            req.session.admin = true
        }
        
        res.redirect("/products")
    // const {mail,password} = req.body
    // try{

    //     const user = await userService.getUserByEmail(mail)

    //     if(!user) throw new Error('invalid data')
    //     if (!comparePassword(user, password)) throw new Error('Invalid data')

    //     await userService.validateAdmin(user.mail,user.password)
        
    //     req.session.user = user

    //     if(user.role === "admin"){
    //         req.session.admin = true
    //     }
    //     res.redirect("/products")
    // }
    // catch(err){
    //     res.status(400).json({error: err.message})
    // }
})

export default userRouter