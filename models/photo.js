const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const photoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    shotDate: {
        type: Date
    }, 

    cameraInfo: {
        type: String
    }, 

    shotLocation: {
        type: String
    },

    img: {
        type: String
    },

    created: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("Photo", photoSchema)