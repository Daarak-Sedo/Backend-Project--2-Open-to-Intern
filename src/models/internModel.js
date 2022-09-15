const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim:true
    },
    mobile: {
        type: String,
        unique: true,
        trim:true,
        required: true
    },
    collegeId: {
        type: ObjectId,
        ref: "internProject_college",
        trim:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('interns', internSchema) 