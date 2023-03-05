const mongoose = require("mongoose");
const {isEmail} = require('express-validator').check();

// create schema

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name can not be empty."],
        maxlength: [50, 'First name is more than 50 characters.'],
        trim: true
    },
    lastName: {
        type: String,
        require: [true, "Last name can not be empty."],
        maxlength: [50, 'Last name is more than 50 characters.'],
        trim: true
    },
    username: {
        type: String,
        require: [true, "username can not be empty"],
        maxlength: [15, 'username is more than 15 characters.'],
        trim: true,
        default: null,
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email can not be empty."],
        unique: [true, "Email already exists"],
        validate: [isEmail, 'invalid Email']
    },
    password:{
        type: String,
        required: [true, "password can not be empty."],
    },
    token: {
        type: String,
    }
}) 



module.exports = mongoose.model('User', UserSchema);
