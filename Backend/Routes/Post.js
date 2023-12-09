const express = require('express');
const router = express.Router();
const User = require('../Modals/User');
const { body, validationResult } = require('express-validator');
const Post = require('../Modals/Post');
const { verifytoken } = require('../middleware/verifytoken');


// ROUTE-1 :- CREATE NEW POST
// METHOD USED :- POST
router.post("/createpost",verifytoken, async (req, res) => {
    
    try {
        console.log(req.body);
        console.log(req.user);
        let {description,image,video}= req.body;
  
        const newPost = new Post({         
            description,image,video,user:req.user.id
        }).save();
 
    //    await newPost.save();
       console.log('New post'+newPost);
       res.status(200).json({newPost});

    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /createnewpost" + error)
    }

})



// ROUTE-2 :- FETCH ALL POSTS OF A USER
// METHOD USED :- GET
router.get("/get/post",verifytoken, async (req, res) => {

    try {

     const user_posts = await Post.find({user:req.user.id});
     if(!user_posts){
        return res.status(400).json("NO POSTS FOUND ...");
     }

    //  console.log(user_posts);
     res.status(200).json({post: user_posts});


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/post" );
    }

})


// ROUTE-3 :- FETCH A POST BY POST ID
// METHOD USED :- GET
router.get("/get/postID/:id", verifytoken, async (req, res) => {
        try {
        console.log(req.params.id);
        const user_posts = await Post.findById(req.params.id);
        if(!user_posts){
            return res.status(400).json("NO POSTS FOUND ...");
        }

        console.log(user_posts);
        //  console.log(user_posts);
        res.status(200).json(user_posts);   
        } catch (error) {
            return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/post" );
        }

})

// ROUTE-4 :- FETCH ALL POSTS
// METHOD USED :- GET
router.get("/get/allpost",verifytoken, async (req, res) => {
    
        try {
    
        const user_posts = await Post.find();
        if(!user_posts){
            return res.status(400).json("NO POSTS FOUND ...");
        }
    
         console.log(user_posts);
        return res.status(200).json({post: user_posts});
        
        
            }
        catch (error) {
            return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/post" );
        }

})

// ROUTE-10 :- FETCH ALL POSTS IN USER PROFILE PAGE
// METHOD USED :- GET
router.get("/get/post/:id", async (req, res) => {
    try {
     const user_posts = await Post.find({user:req.params.id});
     if(!user_posts){
        return res.status(400).json("NO POSTS FOUND ...");
     }

    //  console.log(user_posts);
     res.status(200).json(user_posts);


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/post" );
    }

})


// ROUTE-3 :- UPDATE A POST
// METHOD USED :- PUT
router.put("/update/post/:id",verifytoken, async (req, res) => {

    try {

     let post = await Post.findById(req.params.id);

     if(!post){
        return res.status(400).json("NO SUCH POST FOUND TO UPDATE...");
     }

     post = await Post.findByIdAndUpdate(req.params.id,{
        $set:req.body
     })

     let updated_post = await post.save();

     res.status(200).json(updated_post);


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /update/post"+error );
    }

})


// ROUTE-4:- LIKE A POST
// METHOD :- PUT

router.put("/:id/like",verifytoken,async(req,res)=>{

    try{
    const post =await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.user)){
        await post.updateOne({$push:{likes:req.body.user}});
        if(post.dislikes.includes(req.body.user)){
            await post.updateOne({$pull:{dislikes:req.body.user}});
        }
        return res.status(200).json("POST LIKED SUCCESSFULLY");
    }else{
        await post.updateOne({$pull:{likes:req.body.user}});
        return res.status(200).json("LIKE REMOVED ");
    }
}catch(error){
    return res.status(400).json("SOME ERROR OCCURED IN try-catch in /:id/like"+error );
}

})

// ROUTE-5:- DISLIKE A POST
// METHOD :- PUT

router.put("/:id/dislike",verifytoken,async(req,res)=>{

    try{
    const post =await Post.findById(req.params.id);
    if(!post.dislikes.includes(req.body.user)){
        await post.updateOne({$push:{dislikes:req.body.user}});
       
        if(post.likes.includes(req.body.user)){
            await post.updateOne({$pull:{likes:req.body.user}});
        }
        return res.status(200).json("POST DIS-LIKED SUCCESSFULLY");
    }else{
        await post.updateOne({$pull:{dislikes:req.body.user}});
        return res.status(200).json("DIS-LIKE REMOVED ");
    }
}catch(error){
    return res.status(400).json("SOME ERROR OCCURED IN try-catch in /:id/dislike"+error );
}

})


// ROUTE-6:- ADD A COMMENT ON A POST
// METHOD :- PUT

router.put("/comment/post",verifytoken,async(req,res)=>{

    try{
    const {comment , postId }= req.body;
    const new_comment = {
        user:req.user.id,
        username:req.user.username,
        comment:comment
    }
    const post = await Post.findById(postId);
    post.comments.push(new_comment);
    await post.save();
   res.status(200).json({msg:"NEW COMMENT ADDED SUCCESSFULLY",post});
}catch(error){
    return res.status(400).json("SOME ERROR OCCURED IN try-catch in /comment/post "+error );
}
})

// ROUTE-7:- DELETE A POST
// METHOD :- DELETE

router.delete("/delete/post/:id",verifytoken,async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(400).json("POST NOT FOUND TO DELETE");
        }
 
        if(post.user == req.user.id){
            const deletedPost = await Post.findByIdAndDelete(req.params.id);
            return res.status(200).json({msg:"POST DELETED SUCCESSFULLY",deletedPost});
        }else{
            return res.status(400).json({msg:"DELETING OTHERS POSTS IS NOT ALLOWED"});
        }

}catch(error){

    return res.status(400).json("SOME ERROR OCCURED IN try-catch in /delete/post "+error );

}
})


module.exports=router;