const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Reel = require('../Modals/Reel');
 const User = require('../Modals/User')
const { verifytoken } = require('../middleware/verifytoken');
const ReelComment = require('../Modals/ReelComment');


// ADD NEW REEL
// ROUTER-1:- Add new Reel
router.post("/addnewreel",verifytoken, async (req, res) => {

    try {

        let {description,video}= req.body;
  
        const newReel = new Reel({         
            description,video,user:req.user.id
        })

       await newReel.save();
       console.log(newReel);
       res.status(200).json({newReel});

    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /addnewreel" + error)
    }

})


// GET ALL REELS IN DATA BASE
// ROUTER-2:- Get All Reel
router.get("/getAllReels",async(req,res)=>{
    try{

        const allreels = await Reel.find(); // .find() returns all documnets in a particular collection

        if(!allreels){
            return res.status(400).send("NO REELS FOUND IN DATABASE");
        }
        res.status(200).send(allreels);

    }catch(error){

        return res.status(400).send("SOME ERROR IN try-catch GET ALL REELS");

    }
})


// GET ALL REELS OF A PARTICULAR USER
// METHOD USED :- GET
// ROUTER-3:- Get Reel with id
router.get("/get/reels/:id", async (req, res) => {
    try {
     const user_reels = await Reel.find({user:req.params.id});
     if(!user_reels){
        return res.status(400).json("NO POSTS FOUND ...");
     }

    //  console.log(user_posts);
     res.status(200).json(user_reels);


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/reels" );
    }

})


// ROUTER-4:- React reels

// REACTION_5 OF A REEL
router.put("/:id/react_5_reel",verifytoken,async(req,res)=>{
    try{
       console.log("id check" + req.user.id)
    const reel =await Reel.findById(req.params.id);

    if(!reel.Reaction5.includes(req.user.id)){
        await reel.updateOne({$push:{Reaction5:req.user.id}});
        console.log("Reaction_5 BY USEROO")
       
        return res.status(200).json({msg:'Reacttion5 added successfully',status:'added'});
    }else{
        await reel.updateOne({$pull:{Reaction5:req.user.id}});
        return res.status(200).json({msg:'Reacttion5 removed successfully',status:'removed'});
    }
}catch(error){
    return res.status(400).json("SOME ERROR OCCURED IN try-catch in /:id/react_5_reel"+error );
}

})



// ROUTE-5:- ADD A COMMENT TO A REEL
// METHOD :- PUT

router.put("/:id/commentreel",verifytoken,async(req,res)=>{

    try{
    const {entered_comment}= req.body;
    const user_details_here = await User.findById(req.user.id);
    console.log(user_details_here);
    console.log("CHECKK:"+req.user.id);
    const new_comment = new ReelComment({
        comment_user_id:req.user.id,
        username:req.user.username,
        profilepic:user_details_here.profilepicture,
        comment:entered_comment,
        timestamp:new Date().toLocaleString()
    })

    const reel =await Reel.findById(req.params.id);

    reel.comments.push(new_comment);
    await reel.save();
   res.status(200).json({msg:"NEW COMMENT ADDED SUCCESSFULLY TO REEL ",reel});
}catch(error){
    return res.status(400).json("SOME ERROR OCCURED IN try-catch in /:id/commentreel "+error );
}
})

// ROUTE-6:- Get all comments of a particular reel
// GET ALL COMMENTS OF A PARTICULAR REEL

router.get("/getreelcomments/:id",async(req,res)=>{
    try{
        const reel = await Reel.findById(req.params.id); 
        res.status(200).send(reel.comments)
    }catch(error){
        return res.status(400).send("SOME ERROR OCCURED IN try-catch in get reel comments")
    }
})


module.exports = router;
