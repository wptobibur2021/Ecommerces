/**
 * =====================
 *  USER MODELS DECLARATION BELOW
 * ====================
 */
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    mobile:{
        type: String,
        min: 11
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    img:{
        type: String
    }
}, {timestamps:true})
module.exports = mongoose.model('User', UserSchema)