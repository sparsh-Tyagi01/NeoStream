const mongoose = require('mongoose')
const {Schema} =  mongoose

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: String,
    },

},{timestamps: true})

const User = mongoose.model('Users', schema);

module.exports = User