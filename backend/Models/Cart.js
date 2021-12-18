/**
 * =====================
 *  CATS MODELS DECLARATION BELOW
 * ====================
 */
 const mongoose = require('mongoose')
 const CartSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    products: [
        {
            productID:{
                type: String,
            },
            quantity:{
                type: Number,
                default: 1
            }
        }
    ]
 }, {timestamps:true})
 module.exports = mongoose.model('Cart', CartSchema)