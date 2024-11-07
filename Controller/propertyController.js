
const property = require('../Model/propertySchema');


//upload property
exports.uploadProperty = async(req, res) => {
    console.log("Inside upload property function");
    const userId = req.payload

    const { title, category, type, description, address, country, city, highlights, noofg, beedrooms, bathrooms, price } = req.body
    const { propertyimage, propertyimage2, propertyimage3 } = req.files;
    console.log("Files:", req.files);
   // console.log(`${title},${category},${type},${description},${address},${country},${city},${highlights},${noofg},${beedrooms},${bathrooms},${price},${userId}`);
    // res.status(200).json("upload property request recieved")
    console.log("userid==",userId);
    try {
        const existingProperty = await property.findOne({ address })
        if (existingProperty)
        {
            res.status(406).json("project already exist!! add another one")
        }
        else {
            const newProperty = new property({
                title, category, type, description, address, country, city, highlights, noofg, beedrooms, bathrooms, price, userId,
                propertyimage: propertyimage ? propertyimage[0].filename : undefined,
                propertyimage2: propertyimage2 ? propertyimage2[0].filename : undefined,
                propertyimage3: propertyimage3 ? propertyimage3[0].filename : undefined
 
            })
            await newProperty.save()
           return res.status(200).json(newProperty)
        }
    } catch(err) {
      return  res.status(401).json(`add property api failed,Error:${err}`)
   }
}

//getuserproperty
exports.allUserProperty = async ( req,res) => {
    const userId = req.payload
    try {
        const userProperty = await property.find({userId})
        res.status(200).json(userProperty)
        
    }
    catch(err){
        res.status(401).json(`Failed to fetch user properties. Error: ${err}`);
    }
    
}

//getAllproperties
exports.getallProperty = async (req, res) => {
    const searchKey = req.query.search
    const query = {
        category:{$regex:searchKey, $options:"i"}
    }
    try {
        const allPropery = await property.find(query)
        res.status(200).json(allPropery)
    }
    catch(err){
        res.status(401).json(`Failed to fetch user properties. Error: ${err}`);
    }
}

//edit property
exports.editProperty = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    const { title, category, type, description, address, country, city, propertyimage, propertyimage2, propertyimage3, highlights, noofg, beedrooms, bathrooms, price } = req.body
    const uploadPropertyImage = req.file ? req.file.filename : propertyimage
    const uploadPropertyImage2 = req.file ? req.file.filename : propertyimage2
    const uploadPropertyImagee3=req.file?req.file.filename:propertyimage3
    try {
        const Updateproperty = await property.findByIdAndUpdate({ _id: id }, {
            title, category, type, description, address, country, city,highlights, noofg, beedrooms, bathrooms, price,propertyimage:uploadPropertyImage,propertyimage2:uploadPropertyImage2,propertyimage3:uploadPropertyImagee3,userId
        }, { new: true })
        await Updateproperty.save()
        res.status(200).json(Updateproperty)
    }
    catch(err){
        res.status(401).json(err)
    }
}


//delete property
exports.deletePropertyController = async (req, res) => {
    const { id } = req.params
    try {

        const removeProperty = await property.findByIdAndDelete({_id:id })
        res.status(200).json(removeProperty)
    }
    catch(err){
        res.status(401).json(err)
    }
}



