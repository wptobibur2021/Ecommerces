/**
 * ===================
 * CART ROUTER DECLARATION BELOW
 * ===================
 */
 const router = require('express').Router()
 const Cart = require('../Models/Cart')
 const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./veryfiToken')
// CREATE
router.post('/add', verifyToken, async (req, res)=>{
    const newCart = new Cart(req.body)
    try{
        const saveCart = await newCart.save()
        await res.status(200).json(saveCart)
    }catch(e){
        await res.status(500).json(e.message)
    }
})
// Update
router.put('/update/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {new: true}
        )
        await res.status(200).json(updateCart)
    }catch(e){
        await res.status(500).json(e.message)
    }
})
// Delete
router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        await res.status(200).json('Cart has been delete')
    }catch(e){
        await res.status(500).json(e.message)
    }
})
// GET User Cart
router.get('/user/:userId', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId})
        await res.status(200).json(cart)
    }catch (e){
        await res.status(500).json(e.message)
    }
})
// Get All Cart
router.get('/all', verifyTokenAndAdmin, async(req, res)=>{
    try{
        const cart = await Cart.find()
        await res.status(200).json(cart)
    }catch (e){
        await res.status(500).json(e.message)
    }
})



 module.exports = router