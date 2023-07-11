import jwt from "jsonwebtoken"
import passport from "passport"
const privateKey = "privateKey"

const generateToken = (user) => {
        return jwt.sign({user}, privateKey, {expiresIn: '15m'})
}



const middlewarePassportJWT = async (req,res,next) => {
    passport.authenticate('jwt',{session:false}, (err,actualUser,info)=>{
        if(actualUser){
            req.user = actualUser
        }
        next()
    })(req,res,next)
}

export {generateToken , middlewarePassportJWT }