const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    title :{
        type:String,   
        required:true,
    },  
    category:{
        type:String,
        required:true,
   
    },
    type:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,

    },
    address:{
        type:String,
        required:true,

    },
    country:{
        type:String,
        required:true,

    },
    city:{
        type:String,
        required:true,
    },
    highlights:{
        type:String,
        required:true,

    },
    noofg:{
        type:Number,
        required:true,

    },
    beedrooms:{
        type:Number,
        required:true,

    },
    bathrooms:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,

    },
    propertyimage:{
        type:String,
        required:true,

    },
    propertyimage2:{
        type:String,
        required:true,

    },
    propertyimage3:{
        type:String,
        required:true,

    },

    userId:{
        type:String,
        required:true, 
    }
})


const property= mongoose.model('property',propertySchema);

module.exports=property