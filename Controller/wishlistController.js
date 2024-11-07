
const booking = require('../Model/bookingSchema');
const property = require('../Model/propertySchema');
const wishlist = require('../Model/wishListSchema');

//add to whishlist
exports.addToWishlist= async(req, res) => {
    console.log("Inside whishlist  function");
    const userId = req.payload
        const { id } = req.params
        
        const property_id = await property.findOne({ _id: id })
         console.log(`${userId},${property_id}`);
        //  res.status(200).json("upload property request recieved")
    try {
        const alreadyAdded = await wishlist.findOne({ property_id , userId })
        if (alreadyAdded)
        {
            res.status(406).json("property already added to wishlist !! add another one")
        }
        else {
            const newlyAdded = new wishlist({
                 property_id,userId
               
            })
            await newlyAdded.save()
            res.status(200).json(newlyAdded)
        }
    } catch(err) {
        res.status(401).json(`add to whishlist api failed,Error:${err}`)
    }
    
}

//getuserWishlist
exports.UserWishlist = async ( req,res) => {
    const userId = req.payload
    try {
        const wishlistProperty = await wishlist.find({ userId }).populate('property_id')
        // console.log("User Booked properties:", wishlistProperty);
        if (wishlistProperty.length === 0) {
          return  res.status(404).json({error:"Proprty not added to wishlist  yet"})
        }
        
        res.status(200).json(wishlistProperty)
    }
    catch(err){
      return  res.status(401).json(`Failed to fetch user properties. Error: ${err}`);
    }
    
}

//remove properties from wishlist
exports.RemovefromWishlist = async (req, res) => {
    const { id } = req.params
    // const userId = req.payload
    try {   
        // const User = await wishlist.findOne({ userId })
        {
                const removewishlist = await wishlist.findByIdAndDelete({_id:id })
                res.status(200).json(removewishlist)
            
        }
        
    }
    catch(err){
        res.status(401).json(err)
    }
}


//Book from wishlist
exports.bookFromWishlist = async (req, res) => {
    console.log("Inside book from wishlist function");
    const userId = req.payload;
    const { id } = req.params
    const {date, days } = req.body;
    console.log(req.body,userId);
    
    
    if (!date || !days) {
        return res.status(400).json({ error: "Date and days are required" });
    }

    try {
        const wishlistItem = await wishlist.findOne({ _id: id }).populate('property_id');
        console.log(wishlistItem);
        if (!wishlistItem) {
            return res.status(404).json({ error: "Property not found in wishlist" });
        }
        const property = wishlistItem.property_id;
        const property_id = property._id;
        const price = property.price;
        const total = price * days;
        console.log('total:',total);
        
        //  res.status(200).json("upload property request recieved")
         const propertyExists = await booking.findOne({ property_id, date });
         if (propertyExists) {
             return res.status(406).json({ error: "Property already booked! Choose another date or property." });
         }

        const newBooking = new booking({
            date,
            days,
            total,
            property_id,
            userId
        });

         await newBooking.save();

        // Remove the property from the wishlist after booking
        //  await wishlist.findOneAndDelete({ id, userId });
        return  res.status(200).json(newBooking);
    } catch (err) {
        console.error(`Booking API failed, Error: ${err}`);
        return  res.status(500).json(`Booking API failed, Error: ${err}`);
    }
}


