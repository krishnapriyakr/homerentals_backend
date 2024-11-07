const mongoose = require('mongoose')
const validator=require('validator')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:[3,'must be at least 3 ,got {VALUE}']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email")
            }
        }       
    },
    password:{
        type:String,
        required:true,
    },
    profilePic: {
        type:String
    },
    // wishlist:
    //         //     [
    //         //     { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    //         // ],
    //         // refreshToken:
    //         {
    //         type: String,
    //         },
})
module.exports = mongoose.model("users", userSchema)
module.exports.users