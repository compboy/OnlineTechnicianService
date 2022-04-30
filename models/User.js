const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // user skills
   
    skill: {
        type: String,
        required: true
    },
    /*expertize: {
        type: String,
        required: true */
    /* }, */
    //
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;