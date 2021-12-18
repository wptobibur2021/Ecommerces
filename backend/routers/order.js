/**
 * ===================
 * ORDER ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const Order = require('../Models/Order')
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} = require('./veryfiToken')
 // Create
 router.post('/create', verifyToken, async(req,res)=>{
    const newOrder = new Order(req.body)
    try{
        const saveOrder = await newOrder.save()
        await res.status(200).json(saveOrder)
    }catch(e){
        await res.status(500).json(e.message)
    }
 })
 //Update
router.put('/update/:id', verifyTokenAndAdmin, async(req,res)=>{
    try{
        const updateOrder = await Order.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {new:true}
        )
        await res.status(200).json(updateOrder)
    }catch(e){
        await res.status(500).json(e.message)
    }
})
//Delete
router.delete('/delete/:id', verifyTokenAndAdmin, async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        await res.status(200).json('Order Delete has been successfully!')
    }catch(e){
        await res.status(500).json(e.message)
    }
})
//Get User Order
router.get('/find/:userId', verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const order = await Order.find({userId: req.params.userId})
        await res.status(200).json(order)
    }catch(e){
        await res.status(500).json(e.message)
    }
})
// Get All Orders
router.get('/all', verifyTokenAndAdmin, async(req,res)=>{
    try{
        const order = await Order.find()
        await res.status(200).json(order)
    }catch(e){
        await res.status(500).json(e.message)
    }
})
// Get Monthly Income
router.get('/income', verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try{
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: previousMonth}}},
            {
                $project:{
                    month: {$month: "$createdAt"},
                    sales: "$amount"
                },
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: "$sales"}
                },
            }
        ])
        await res.status(200).json(income)
    }catch(e){
        await res.status(500).json(e.message)
    }
})
 module.exports = router