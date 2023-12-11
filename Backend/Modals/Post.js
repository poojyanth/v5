const mongoose = require("mongoose");

const Postschema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    likes: {
        type: Array,
        default:0
    },
    tags: [
        {
            type: String,
        }
    ],
    dislikes: {
        type: Array,
        default:0
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        comment: {
            type: String
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }



})

module.exports = mongoose.model('Post', Postschema);