const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email : String,
    otp : Number,
    password : String
})

const NewID = mongoose.model("NewID", otpSchema);

module.exports = NewID