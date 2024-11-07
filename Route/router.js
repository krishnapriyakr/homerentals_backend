const express = require('express')

const router = new express.Router()
const userController=require('../Controller/userController')
const propertyController=require('../Controller/propertyController')
const jwtMiddleware = require('../middileware/jwtMiddileware')
const multerConfig = require('../middileware/multerMiddileware')
const bookingController = require('../Controller/bookingController')
const wishlistController=require('../Controller/wishlistController')

//register api
router.post('/user/register', userController.register)

//login 
router.post('/user/login', userController.login)

//upload Property
//router.post('/property/add',jwtMiddleware,multerConfig.array('propertyimage',3),propertyController.uploadProperty)
router.post('/property/add', jwtMiddleware, multerConfig.fields([
    { name: 'propertyimage', maxCount: 1 },
    { name: 'propertyimage2', maxCount: 1 },
    { name: 'propertyimage3', maxCount: 1 }
]), propertyController.uploadProperty);

//getUserProperties
router.get('/user/all-property',jwtMiddleware,propertyController.allUserProperty);

//getAllproperties
router.get('/property/all', jwtMiddleware, propertyController.getallProperty);

//edit project
//  router.put('/property/edit/:id', jwtMiddleware, multerConfig.single("projectImage"), propertyController.editProperty)
router.put('/property/edit/:id', jwtMiddleware, multerConfig.fields([
    { name: 'propertyimage', maxCount: 1 },
    { name: 'propertyimage2', maxCount: 1 },
    { name: 'propertyimage3', maxCount: 1 }
]), propertyController.editProperty);

//delete property
router.delete('/property/remove/:id',jwtMiddleware, propertyController.deletePropertyController)


//add to whishlist
router.post('/wishlist/add/:id', jwtMiddleware, wishlistController.addToWishlist)

//get wishlist
router.get('/user/all-wishlist', jwtMiddleware, wishlistController.UserWishlist);

//remove wishlist
router.delete('/wishlist/remove/:id', jwtMiddleware, wishlistController.RemovefromWishlist);

//book From wishlist
router.post('/booking/add/:id', jwtMiddleware, wishlistController.bookFromWishlist);

// booking
router.post('/booking/add/:id',jwtMiddleware,bookingController.propertybooking)

//getUserProperties
router.get('/user/all-booking', jwtMiddleware, bookingController.allUserBookedProperty);

//delete property
router.delete('/booking/remove/:id', jwtMiddleware, bookingController.cancelBooking);


//export router
module.exports=router