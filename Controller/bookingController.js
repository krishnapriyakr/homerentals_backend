const booking = require('../Model/bookingSchema');
const property = require('../Model/propertySchema');

//Booking
exports.propertybooking = async(req, res) => {
    console.log("Inside  property booking function");
    const userId = req.payload
    const { id } = req.params
    // const {price}=property.price
    const { date, days } = req.body
    console.log(req.body);
    
    if (!date || !days) {
        return res.status(400).json({error:"date and time are required"})
    }

    try {
        const property_id = await property.findOne({ _id: id })
        const price=property_id.price
        console.log(property_id,"price :",typeof(price),price );
        const total = price * days
        console.log( "total is a :" ,typeof(total));
         console.log(`${date},${days},${total},${userId},${property_id}}`);
    //  res.status(200).json("upload property request recieved")
           
        const allreadyBooked = await booking.findOne({ property_id,date })
        if (allreadyBooked)
        {
           return res.status(406).json("property already booked!! add another one")
        }
        else {
            
            const newBooking = new booking({
                date, days, total, property_id,userId
               
            })
            await newBooking.save()
           return res.status(200).json(newBooking)
        }
    } catch(err) {
       return res.status(401).json(`booking api failed,Error:${err}`)
   }
}

//getuserBookedproperty
exports.allUserBookedProperty = async ( req,res) => {
    const userId = req.payload
    try {
        const userBookedProperty = await booking.find({ userId }).populate('property_id')
        // console.log("User Booked properties:", userBookedProperty);
        if (userBookedProperty.length === 0) {
          return  res.status(404).json({error:"Property not booked yet"})
        }
        
        res.status(200).json(userBookedProperty)
    }
    catch(err){
       return res.status(401).json(`Failed to fetch user properties. Error: ${err}`);
    }
    
}


//cancel booking
exports.cancelBooking = async (req, res) => {
    const { id } = req.params;
    // const userId = req.payload
    try {
        // const User = await booking.findOne({ userId })
        {
            
        const cancelBooking = await booking.findByIdAndDelete({_id:id })
        return  res.status(200).json(cancelBooking)
            
        }
    }
    catch(err){
       return res.status(401).json(err)
    }
}

