const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({

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
   
    },
    following: {
        type: Array,
    },
    profilepicture:{
        type:String
    },
    Likedposts:{
        type:Array,
    },
    Stories:{
        type:Array,
    }, 
    StoryDescription:{
        type:String
    }



})

module.exports = mongoose.model('User',Userschema);