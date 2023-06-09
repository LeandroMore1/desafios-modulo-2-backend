import userModel from "../models/user.model.js";



class UserService {
    constructor(){
        this.model = userModel
    }

    async getUsers(){
        return await this.model.find()
    }

    async assignCartToUser(cartId,userId){
        const findUser = await this.model.findById(userId)
        findUser.cart = cartId
        return await findUser.save()
    }

    async validateAdmin(mail,password){
        const user = await this.model.findOne( {email: mail})
        if(user.email === "adminCoder@coder.com" && user.password === password){
            user.role = "admin"
        } else {
            user.role = "user"
        }
        return await user.save()
    }

    async createUser(user){
        return await this.model.create(user)
    }   

    async getUserById(id){
        return await this.model.findById(id)
    }

    async getUserByEmail(mail){
        return await this.model.findOne( {email: mail}).lean()
    }

}

export const userService = new UserService()