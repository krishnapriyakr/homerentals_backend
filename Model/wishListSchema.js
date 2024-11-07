const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "property",
        required:true,
    },
    userId:{
        type:String,
        required:true, 
    }
})

const wishlist = mongoose.model('wishlist', wishListSchema);
module.exports=wishlist