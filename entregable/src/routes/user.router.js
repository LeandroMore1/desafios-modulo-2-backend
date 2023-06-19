import { Router } from "express";
import { userService } from "../services/user.service.js";

const userRouter = Router()

userRouter.post("/",async(req,res)=>{
    const user = req.body
    try{
        const newUser = await userService.createUser(user)
        res.redirect("/login")
    } catch (err){
        res.status(400).json({error: err.message} )
    }
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

userRouter.post("/auth", async(req, res)=>{
    const {mail,password} = req.body
    try{

        const user = await userService.getUserByEmail(mail)

        if(!user) throw new Error('invalid data')
        if(user.password !== password) throw new Error('invalid data')

        await userService.validateAdmin(user.mail)
        
        req.session.user = user

        if(user.role === "admin"){
            req.session.admin = true
        }
        res.redirect("/products")
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

export default userRouter