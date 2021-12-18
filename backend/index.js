/**
 * ===================
 * Require File Declaration Below
 * ===================
 */
const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const cors = require('cors')
const userRoute = require('./routers/user')
const authRoute = require('./routers/auth')
const productRoute = require('./routers/product')
const cartRouter = require('./routers/cart')
const orderRoute = require('./routers/order')
const stripeRoute = require('./routers/stripe')

/***
 * ===================
 * MIDLEWARE DECLARATION BELOW
 * ===================
 */
    const app = express();
    app.use(express.json())
    app.use(cors())
    app.use('/api/user/', userRoute)
    app.use('/api/auth/', authRoute)
    app.use('/api/product/', productRoute)
    app.use('/api/cart/', cartRouter)
    app.use('/api/order/', orderRoute)
    app.use('/api/checkout/', stripeRoute)


 /**
  * ================
  *  BACKEND SERVER RUNNING SERVER PORT
  * ================
  */
    const port = process.env.port || 8080


/**
 * ======================
 * DATABASE CONNECTION
 * ======================
 */
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('DB Ok'))
    .catch(err => console.log(err))

/***
 * =======================
 * ROOT BACKEND SERSER API
 * =======================
 */
app.get('/', async (req, res)=>{
    await res.send('Backend Server Hello ok')
})
/**
 * ========================
 *  APP LISTEN DECLARATION BELOW
 * ========================
 */
app.listen(port, () =>{
    console.log(`'Backend Server Start at http://localhost:${port}`)
})