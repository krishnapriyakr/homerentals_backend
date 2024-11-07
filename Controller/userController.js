const property = require('../Model/propertySchema');
const users=require('../Model/userSchema')
const jwt = require('jsonwebtoken')



//registeer
exports.register =async (req, res) => {
    console.log("inside register controller function");
    const {username, email, password} = req.body
    //  console.log(`${username},${email},${password}`);
    try{
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("already exists!! please login ")
        }
        else {
            const newUser = new users({
               username,email,password,profilePic:"" 
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
        }
        catch (err) {
            res.status(401).json(`register api failed,error :${err}`)
        }    
}

//login
exports.login =async (req, res) => {
    console.log("Inside login function");
    const {email, password} = req.body
    // console.log(`${username},${email},${password}`);
    try{
    const existingUser = await users.findOne({ email,password})
        if (existingUser) {
         const token=jwt.sign({userId:existingUser._id},"secretkey123")
        res.status(200).json({existingUser,token})
    }
    else {
        res.status(404).json("Incorrect email/password")
    }
    }
    catch (err) {
        res.status(401).json(`login api failed,error :${err}`)
    }
}



