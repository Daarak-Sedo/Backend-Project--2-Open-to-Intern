const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: "Please enter a valid email"
        },
        unique: true,
        required: 'Email is required'
    },
    mobile: {
        type: String,
        unique: true,
        required: "Mobile number is required",
        match: /^([+]\d{2})?\d{10}$/
    },
    collegeId: {
        type: ObjectId,
        ref: "internProject_college"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('internProject_intern', internSchema) 