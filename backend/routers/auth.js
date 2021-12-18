/**
 * ===================
 * AUTH ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const User = require('../Models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

   //User Registration 
   router.post('/registration', async(req, res)=>{
      const newUser = new User({
         fullname: req.body.fullname,
         username: req.body.username,
         email: req.body.email,
         password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_KEY).toString(), 
      })
      try{
         const saveUser = await newUser.save()
         await res.status(200).json(saveUser)
      }catch(e){
         await res.status(500).json(e.message)
      }
   })

   // User Login
   router.post('/login', async(req, res)=>{
      try{
         const user = await User.findOne({username: req.body.username}) 
         !user && await res.status(401).json('User not found')
         const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_KEY)
         const userPassword = hashPassword.toString(CryptoJS.enc.Utf8)
         userPassword !== req.body.password && await res.status(401).json('Password is wrong')
         const accessToken = jwt.sign(
            {
               userId: user._id,
               isAdmin: user.isAdmin
            },
            process.env.JWT_KEY,
            {expiresIn: '3d'}
         );
         const { password, ...others } = user._doc
         await res.status(200).json({...others, accessToken})
      }catch (e){
         await res.status(500).json(e.message)
      }
   })
 module.exports = router