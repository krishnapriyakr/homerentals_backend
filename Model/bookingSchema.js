const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    date:{
        type:Date,   
        required:true,
    },  
    days:{
        type:Number,
        required:true,
   
    },
    total:{
        type: Number,
        required:true,
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "property",
        required:true,
    },
    userId: {
        type: String,
        required:true,
    }
})

const booking = mongoose.model('booking', bookingSchema);
module.exports=booking