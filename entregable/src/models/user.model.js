import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: {unique: true, required: true, type:String, index: true},
    age: Number,
    password: String,
    cart: {
        type:   mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        require: false,
        unique: true
    },
    img: String,
    role: {
        type: String,
    }
})      

const userModel = mongoose.model('users' , userSchema)

export default userModel