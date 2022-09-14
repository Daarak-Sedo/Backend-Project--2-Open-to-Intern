const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: 'Name is required',
        lowercase: true
    },
    fullName: {
        type: String,
        required: 'Full name is required'
    },
    logoLink: {
        type: String,
        required: 'Logo is required'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('internProject_college', collegeSchema) 
