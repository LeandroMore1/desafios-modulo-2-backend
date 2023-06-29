import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: {unique: true, required: true, type:String, index: true},
    password: String,
    img: String,
    role: {
        type: String,
    }
})      

const userModel = mongoose.model('users' , userSchema)

export default userModel