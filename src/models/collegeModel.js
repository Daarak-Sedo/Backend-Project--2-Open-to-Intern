const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required:true,
        lowercase: true,    // it will convert in lowercase automatically
        trim:true
    },
    fullName: {
        type: String,
        required: true,
        trim:true
    },
    logoLink: {
        type: String,
        required: true,
        trim:true

    },
    isDeleted: {
        type: Boolean,
        default: false,
        trim:true
    }
}, { timestamps: true });

module.exports = mongoose.model('colleges', collegeSchema) 
