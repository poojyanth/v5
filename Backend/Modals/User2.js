const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    followers: {
        type: Array,
        default: []
   
    },
    following: {
        type: Array,
        default: []
    },
    profilepicture:{
        type:String,
        default:""
    },
    Likedposts:{
        type:Array,
        default:[]
    },
    Stories:{
        type:Array,
        default:[]
    }, 
    StoryDescription:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    type:{
        type: Number,
        default: 2,
        immutable: true
    }



})

module.exports = mongoose.model('Organization',OrganizationSchema);