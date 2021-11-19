const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phoneNum: {
        type: String
    },

    password: {
        type: String,
        required: true
    },

    created: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("User", userSchema)