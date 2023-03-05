const mongoose = require("mongoose");
const {isEmail} = require('express-validator').check();

// create schema 
const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name can not be empty."],
        maxlength: [50, 'First name is more than 50 characters.'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last name can not be empty."],
        maxlength: [50, 'Last name is more than 50 characters.'],
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        default: "Not Comfortable"
    },
    email: {
        type: String,
        trim: true,
        unique: [true, "Email already exists"],
        required: [true, "Email can not be empty."],
        validate: [isEmail, 'invalid Email']
    },
});


module.exports = ContactSchema;
