/**
 * =====================
 *  PRODUCTS MODELS DECLARATION BELOW
 * ====================
 */
 const mongoose = require('mongoose')
 const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    categories:{
        type: Array,
        required: true
    },
    color:{
        type: Array,
    },
    size:{
        type: Array
    },
    isStock:{
        type: Boolean,
        default: true
    }

 }, {timestamps:true})
 module.exports = mongoose.model('Product', ProductSchema)