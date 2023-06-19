import userModel from "../models/user.model.js";

class UserService {
    constructor(){
        this.model = userModel
    }

    async getUsers(){
        return await this.model.find()
    }

    async validateAdmin(mail){
        const user = await this.model.findOne( {mail: mail})
        if(user.mail === "adminCoder@coder.com" && user.password === "adminCod3r123"){
            user.role = "admin"
        } else {
            user.role = "user"
        }
        return await user.save()
    }

    async createUser(user){
        return await this.model.create(user)
    }

    async getUserByEmail(mail){
        return await this.model.findOne( {mail: mail})
    }

}

export const userService = new UserService()