/**
 * ===================
 * USER ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const User = require('../Models/User')
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./veryfiToken')
    // GET
    router.get('/get/:id', verifyTokenAndAdmin, async(req,res)=>{
        try{
            const user = await User.findById(req.params.id)
            const {password, ...other} = user._doc
            await res.status(200).json(other)
        }catch(e){
            await res.status(401).json(e.message)
        }
    })
    // GET ALL USERS
    router.get('/all', verifyTokenAndAdmin, async(req,res)=>{
        const query = req.query.new
        //console.log('Header', query)
        //console.log('Admin: ', verifyTokenAndAdmin)
        try{
            const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find({})
            await res.status(200).json(users)
        }catch(e){
            await res.status(401).json(e.message)
        }
    })
    // STATS
    router.get('/stats', verifyTokenAndAdmin, async(req,res)=>{
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        try{
            const data = await User.aggregate([
                {$match: { createdAt: {$gte: lastYear} }},
                
                {
                    $project:{
                        month: {$month: '$createdAt'}
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 },
                    },
                }
            ])
            await res.status(200).json(data)
        }catch(e){
            await res.status(500).json(e.message)
        }
    })
    // UPDATE
    router.put('/update/:id', verifyTokenAndAuthorization, async(req, res)=>{
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_KEY).toString()
        }
        try{
            const updateUser  = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
            }, {new:true})
            await res.status(200).json(updateUser)
        }catch(e){
            await res.status(401).json(e.message)
        }
    })
    //DELETE
    router.delete('/delete/:id', verifyTokenAndAuthorization, async(req,res)=>{
        try{
            await User.findByIdAndDelete(req.params.id)
            await res.status(200).json('User delete has bees successfully!')
        }catch(e){
            await res.status(401).json(e.message)
        }
    })
module.exports = router
