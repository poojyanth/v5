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
    coverphoto:{
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
    },
    bio:{
        type:String
    },
    type:{
        type: Number,
        default: 1,
        immutable: true
    },

    StoryViewers: {
        type: [String], 
        default: [],
      }


})

module.exports = mongoose.model('User',Userschema);