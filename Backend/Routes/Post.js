const express = require('express');
const router = express.Router();
const User = require('../Modals/User');
const { body, validationResult } = require('express-validator');
const Post = require('../Modals/Post');
const Message = require('../Modals/Message');
const { verifytoken } = require('../middleware/verifytoken');


// ROUTE-1 :- CREATE NEW POST
// METHOD USED :- POST
router.post("/createpost",verifytoken, async (req, res) => {
    
    console.log(req.body);

    try {
        // console.log(req.body);
        // console.log(req.user);
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

        // console.log(user_posts);
        //  console.log(user_posts);
        res.status(200).json(user_posts);   
        } catch (error) {
            return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/post" );
        }

})

// ROUTE-4 :- Update Post

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

// ROUTE-5 :- FETCH ALL POSTS
// METHOD USED :- GET
router.get("/get/allpost",verifytoken, async (req, res) => {
    
        try {
    
        const user_posts = await Post.find();
        if(!user_posts){
            return res.status(400).json("NO POSTS FOUND ...");
        }
    
        // console.log(user_posts);
        return res.status(200).json({post: user_posts});
        
        
            }
        catch (error) {
            return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/post" );
        }

})

// ROUTE-6 :- Get ALL POSTS

router.get("/get/allposts", verifytoken, async (req, res) => {
    
    try {

    const user_posts = await Post.find();
    if(!user_posts){
        return res.status(400).json("NO POSTS FOUND ...");
    }
    return res.status(200).json({post: user_posts});
    
    
        }
    catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/post" );
    }

})




// ROUTE-7: FETCH ALL POSTS WITH A KEY
// METHOD USED :- GET
router.get("/get/:key", verifytoken, async (req, res) => {
    try {
        const currentUser = req.user.id;
        const user = await User.findById(currentUser);
        if (!user) {
            return res.status(400).json("User not found");
        }

        const mergedData = await Post.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userData",
                },
            },
            {
                $unwind: "$userData",
            },
            {
                $project: {
                    _id: 1,
                    user: 1,
                    description: 1,
                    image: 1,
                    video: 1,
                    likes: 1,
                    dislikes: 1,
                    comments: 1,
                    createdAt: 1,
                    "userData.username": 1,
                    "userData.email": 1,
                    "userData.phonenumber": 1,
                    "userData.followers": 1,
                    "userData.following": 1,
                    "userData.profilepicture": 1,
                },
            },
        ]);

        const searchQuery = req.params.key.toLowerCase();

        let searchResults = mergedData.filter((post) => {
            return (
                post.description.toLowerCase().includes(searchQuery) ||
                post.userData.username.toLowerCase().includes(searchQuery) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
            );
        });

        console.log(searchResults);
        return res.status(200).json({ post: searchResults });
    } catch (error) {
        console.error(error);
        return res.status(400).json("Some error occurred in try-catch in /get/allpost");
    }
});


// ROUTE-8 :- FETCH ALL POSTS IN USER PROFILE PAGE
// METHOD USED :- GET
router.get("/get/post/:id", verifytoken, async (req, res) => {
    try {
     const user_posts = await Post.find({user:req.params.id});
     if(!user_posts){
        return res.status(400).json("NO POSTS FOUND ...");
     }

    //  console.log(user_posts);
     return res.status(200).json(user_posts);


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/post" );
    }

})


// ROUTE-9 :- UPDATE A POST
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

     return res.status(200).json(updated_post);


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /update/post"+error );
    }

})


// ROUTE-10:- LIKE A POST
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

// ROUTE-11:- DISLIKE A POST
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


// ROUTE-12:- ADD A COMMENT ON A POST
// METHOD :- PUT

router.put("/comment/post",verifytoken,async(req,res)=>{
    console.log(req.body);
    try{
    const {comment , postId }= req.body;
    const new_comment = {
        user: req.user.id,
        username:req.user.username,
        comment:comment 
    }
    const post = await Post.findById(postId);
    post.comments.push(new_comment);
    await post.save();
   res.status(200).json({msg:"NEW COMMENT ADDED SUCCESSFULLY",post});
}catch(error){
    console.log(error);
    return res.status(400).json("SOME ERROR OCCURED IN try-catch in /comment/post "+error );
}
})

// ROUTE-13:- DELETE A POST
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


// ROUTE-14:- Message

router.post('/msg',verifytoken,async(req,res)=>{
    try{
    const {from,to,message} = req.body;
    const newmessage = await Message.create({
        message:message,
        Chatusers:[from,to],
        Sender:from
    })
    return res.status(200).json(newmessage)
}catch(error){
    return res.status(500).json("ERROR IN TRY - CATCH IN create message")  
}
})

// ROUTE-15:- Get Message
// get messages

router.get('/get/chat/msg/:user1Id/:user2Id',async(req,res)=>{
    try{
    const from = req.params.user1Id;
    const to = req.params.user2Id;
    const newmessage = await Message.find({
       Chatusers:{
        $all:[from,to]
       }
    }).sort({updatedAt:1});

    const allmessages = newmessage.map((msg)=>{
        return{
            myself:msg.Sender.toString()===from,
            message:msg.message
        }
    })
    return res.status(200).json(allmessages)
}catch(error){
    return res.status(500).json("ERROR IN TRY - CATCH IN get meassages"+error)  
}
})

// ROUTE-16:- Fetch all liked posts of a particular user
router.get("/get_all_liked_posts",verifytoken, async (req, res) => {

    try {

     const user = await User.findById(req.user.id);

     const AllLikedPostsOfUser = await Promise.all(
        user.Likedposts.map((each_post_id)=>{
            return Post.findById(each_post_id)
        })
     )


     if(!AllLikedPostsOfUser){
        return res.status(400).json("NO POSTS FOUND ...");
     }

     res.status(200).json(AllLikedPostsOfUser);

    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get_all_liked_posts" );
    }

})


module.exports=router;