const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRET_KEY;

const { body, validationResult } = require('express-validator');
const Organization = require('../Modals/User2');
const { verifytoken } = require('../middleware/verifytoken');
const Post = require('../Modals/Post');
const User = require('../Modals/User');


// ROUTE-1 :- CREATE NEW USER
// METHOD USED :- POST
router.post("/create/user", async (req, res) => {

    console.log(req.body);
    // check if any errors in validation
    const errors = validationResult(req); // USE req NOT req.body HERE
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log(req.body);
        // check if user with given email already exists

        let user1 = await Organization.findOne({ email: req.body.email });
        let user2 = await Organization.findOne({ username: req.body.username });
        if (user1 || user2) {
            console.log('user already exists');
            return res.status(400).json("A USER WITH THIS EMAIL/USERNAME ALREADY EXISTS , PLEASE LOGIN")
        }

        console.log('user does not exists');

        // generate salt for password hashing
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        console.log(req.body);

        // if no user exists -> create new user
        const user = await Organization.create({
            username: req.body.username,
            email: req.body.email,
            password: securePassword,
            phonenumber: req.body.phonenumber,
            profilepicture: req.body.profilepicture,
        })

        user.save();

        const jwttoken = jwt.sign({
            id:user._id,
            username:user.username
        },SECRETKEY);

        // await user.save();
        console.log(user);

        res.status(200).json({ msg: "NEW USER CREATED SUCCESSFULLY", user,jwttoken });

    } catch (error) {
        console.log('error in create user');
        console.log(error);
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /create/user route:" + error)
    }

})


// ROUTER-2:- USER LOGIN

router.post("/login", [
    body('email', 'EMAIL MUST HAVE MINIMUM LENGTH 5').isLength({ min: 5 }),
    body('password', 'USERNAME MUST HAVE MINIMUM LENGTH 3').isLength({ min: 3 })], async (req, res) => {
        console.log(req.body);
        // check if any errors in validation
        const errors = validationResult(req); // USE req NOT req.body HERE
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{

            // if we are using .select("-password") -> i.e not selecting passsword from database
            // then we will we unable to use bcrypt.compare as it require user.passsword to compare
        // const user = await User.findOne({email:req.body.email}).select("-password");
        
        // THEREFORE ALSO SELECT PASSWORD FROM DATABASE
         const user = await Organization.findOne({email:req.body.email});
        
        if(!user){
           return res.status(400).json("NO USER EXISTS WITH GIVEN EMAIL ID");
        }

        const comparePassword = await bcrypt.compare(req.body.password,user.password);

        if(!comparePassword){
            console.log("INCORRECT PASSWORD");
            return res.status(400).json("INCORRECT PASSWORD");
        }

        const jwttoken = await jwt.sign({
            id:user._id,
            username:user.username
        },SECRETKEY);

        return res.status(200).json({msg:"USER FOUND",user,jwttoken});
    }catch(error){
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /login route:" + error)
    }


    })


// ROUTE-3 :- FOLLOW A USER
// METHOD USED :- PUT

// USER-2 IS TRYING TO FOLLOW USER-1
// therefore id in "/follow/:id" must be of user-1
// and user in req.body.user must be id of user-2
// jwttoken in headers must be of user-2 as he has to login into his account to follow others
// router.put("/follow/:id",verifytoken, async (req, res) => {

//     try {

//      const user1 = await User.findById(req.params.id);
//      const user2 = await User.findById(req.body.user);

//      if(req.params.id === req.body.user){
//         return res.status(400).json("YOU CANNOT FOLLOW YOURSELF");
//      }


//      if(user1.followers.includes(user2)){
//         return res.status(400).json("YOU ALREADY FOLLOWS THE USER");
//      }

   
//      await user1.updateOne({$push:{followers:req.body.user}})
//      await user2.updateOne({$push:{following:req.params.id}})


//      res.status(200).json("FOLLOWING SUCCESSFULLY");


//     } catch (error) {
//         return res.status(400).json("SOME ERROR OCCURED IN try-catch in /follow/ "+error );
//     }

// })

router.put("/follow/:id" , verifytoken , async(req , res)=>{
    console.log("follow route");
    if(req.params.id !== req.body.user){
        const user = await Organization.findById(req.params.id);
        const otheruser = await Organization.findById(req.body.user);

        if(!user.followers.includes(req.body.user)){
            await user.updateOne({$push:{followers:req.body.user}});
            await otheruser.updateOne({$push:{following:req.params.id}});
            return res.status(200).json("User has followed");
        }else{
            await user.updateOne({$pull:{followers:req.body.user}});
            await otheruser.updateOne({$pull:{following:req.params.id}});
            return res.status(200).json("User has Unfollowed");
        }
    }else{
        return res.status(400).json("You can't follow yourself")
    }
})

//Following
// router.put("/following/:id" , verifytoken , async(req , res)=>{
//     if(req.params.id !== req.body.user){
//         const user = await User.findById(req.params.id);
//         const otheruser = await User.findById(req.body.user);

//         if(!user.Followers.includes(req.body.user)){
//             await user.updateOne({$push:{Followers:req.body.user}});
//             await otheruser.updateOne({$push:{Following:req.params.id}});
//             return res.status(200).json("User has followed");
//         }else{
//             await user.updateOne({$pull:{Followers:req.body.user}});
//             await otheruser.updateOne({$pull:{Following:req.params.id}});
//             return res.status(200).json("User has Unfollowed");
//         }
//     }else{
//         return res.status(400).json("You can't follow yourself")
//     }
// })


// ROUTE-3 :- FETCH POSTS OF FOLLOWERS
// METHOD USED :- GET
// user2 is following user1 -> so need to get user1's posts in user2 account (after login )
// here id in req.params.id and jwttoken are of user2 as he need to login
// no need of id here as we have jwttoken -> will change it later


// ROUTE-4 :- FETCH POSTS OF FOLLOWING USERS
router.get("/followingposts/:id", verifytoken, async (req, res) => {
    try {
      const user2 = await Organization.findById(req.params.id);
  
      const followingPosts = await Promise.all(
        user2.following.map((each_following_user_account) => {
          return Post.find({ user: each_following_user_account });
        })
      );
  
      const your_posts = await Post.find({ user: user2._id });
  
      // Combine your_posts and followingPosts into a single array
      let allPosts = your_posts.concat(...followingPosts);
  
      // Sort allPosts by upload date (assuming the date attribute is named 'createdAt')
      allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      res.status(200).json(allPosts);
    } catch (error) {
      return res.status(400).json("SOME ERROR OCCURRED IN try-catch in /follow/ " + error);
    }
  });
  
  
  
  


// ROUTE-5 :- UPDATE USER PASSWORD
// METHOD USED :- PUT

router.put("/update/:id",verifytoken, async (req, res) => {

    try {
        if(req.params.id === req.user.id){

        if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        req.body.password=securePassword;
        const updateuser = await Organization.findByIdAndUpdate(req.params.id,{
            $set:req.body
        });
        await updateuser.save();
        res.status(200).json({msg:"PASSWORD UPDATED SUCCESSFULLY",updateuser});
        }
    }else{
        return res.status(400).json("YOU CANNOT UPDATE OTHERS PROFILE");
    }

    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /update/:id " + error );
    }

})


// ROUTE-6 :- DELETE USER ACCOUNT
// METHOD USED :- DELETE

router.delete("/delete/:id",verifytoken, async (req, res) => {

    try {

        if(req.params.id !== req.user.id){
            return res.status(400).json("CANNOT DELETE OTHERS ACCOUNT");
        }

      const user = await Organization.findByIdAndDelete(req.params.id)
      res.status(200).json({msg:"ACCOUNT DELETED SUCCESSFULLY",user});


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /delete/:id " + error );
    }

})


//ROUTE -7 :-GET USER DETAILS FOR A POST

router.get("/post/user/details/:id",verifytoken,async(req,res)=>{
    try{
    const user = await Organization.findById(req.params.id);
    // console.log("UserID requested"+req.params.id);
    if(!user){
        req.status(400).send("CAN'T GET USER FOR A POST");
    }
    const {email,password,phonenumber,...others}= user._doc;
    // remaining details will be stores in others variable
    // others contain username,profilpicture
    // console.log(others)
    res.status(200).send(others);
}catch(error){
    return res.status(400).send("SOME ERROR IN TRY_ CATCH (get user for a post)")
}

})

// ROUTE-8:- GET USER DETAILS WITH USERID

router.get("/user/details/:id",verifytoken,async(req,res)=>{
    try{
    const user = await Organization.findById(req.params.id);
    if(!user){
        req.status(400).send("CAN'T GET USER FOR A POST");
    }
    const {email,password,phonenumber,...others}= user._doc;
    // remaining details will be stores in others variable
    // others contain username,profilpicture
    res.status(200).send({User: others});
}catch(error){

    return res.status(400).send("SOME ERROR IN TRY_ CATCH (get user for a post)")
}

})


// GET USERS TO FOLLOW
// i.e :- GET USERS IN SUGGESTED FOR YOU LIST
// THOSE ARE USERS THAT ARE NOT IN YOUR FOLLOWING LIST (array)
// ROUTE-9 :- GET USERS TO FOLLOW
router.get("/all/user/:id", verifytoken, async (req, res) => {
    try {
        const allUsersInDb = await Organization.find();
        const current_user = await Organization.findById(req.params.id);

        const followingsOfCurrent_user = current_user.following.map((item) => item.toString());

        let UsersNotFollowed = allUsersInDb.filter((val) => {
            // Exclude the own user account from suggestions
            return val._id.toString() !== req.params.id &&
                !followingsOfCurrent_user.includes(val._id.toString());
        });

        let SuggestedForYouList = UsersNotFollowed.map((item) => {
            const { email, phonenumber, password, followers, following, ...others } = item._doc;
            return others;
        });

        res.status(200).send(SuggestedForYouList);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



// ROUTE -10 :-GET FOLLOWING LIST OF LOGGED IN USER

router.get("/get/followings/:id",verifytoken, async(req,res)=>{
    try{
        console.log("get followings route",req.params.id);
        const user = await Organization.findById(req.params.id);
        const followings = await Promise.all(
            user.following.map((item)=>{
                return Organization.findById(item);
            })
        )

        let followingList =[];

        followings.map((person)=>{
            const {email,passsword,phonenumber,followers,following,...others}=person._doc;
            followingList.push({others})
        })


        return res.status(200).send(followingList)
    }catch(error){
        
        return res.status(400).send("SOME ERROR OCCURED IN try-catch")
    }
})


// ROUTE-11:- GET FOLLOWERS LIST OF LOGGED IN USER

router.get("/get/followers/:id",async(req,res)=>{
    try{

        const user = await Organization.findById(req.params.id);
        const FFollowers = await Promise.all(
            user.followers.map((item)=>{
                return Organization.findById(item);
            })
        )

        let FFollowersList =[];

        FFollowers.map((person)=>{
            const {email,passsword,phonenumber,followers,following,...others}=person._doc;
            FFollowersList.push({others})
        })


        return res.status(200).send(FFollowersList)

    }catch(error){
        
        return res.status(400).send("SOME ERROR OCCURED IN try-catch")
    }
})

//ROUTE-12 :- GET LIKED POSTS OF A USER

router.put("/likedpost/:id", async (req, res) => {
    try {
        const liked_user = await Organization.findById(req.body.user);

        if (!liked_user) {
            return res.status(404).send("User not found");
        }

        console.log(liked_user);

        if (!liked_user.Likedposts.includes(req.params.id)) {
            await liked_user.updateOne({ $push: { Likedposts: req.params.id } });
        } else {
            await liked_user.updateOne({ $pull: { Likedposts: req.params.id } });
        }

        return res.status(200).send("Update successful");
    } catch (error) {
        return res.status(400).send("ERROR IN User.js route likedposts: " + error);
    }
});


// ROUTE - 13 :- get users from following who are having stories
router.get("/get/followings_with_stories/:id",async(req,res)=>{
    try{
        const user = await Organization.findById(req.params.id);
        
        const followings = await Promise.all(
            user.following.map((item)=>{
                return Organization.findById(item);
            })
        )

        let followingList =[];

        const {email,passsword,phonenumber,followers,following,...others}=user._doc;
        if(others.Stories.length!==0){
            followingList.push({others})
        }

        followings.map((person)=>{
            const {email,passsword,phonenumber,followers,following,...others}=person._doc;
            if(others.Stories.length!==0){
                followingList.push({others})
            }

        })

        // console.log(followingList);


        res.status(200).send(followingList)


    }catch(error){
        
        return res.status(400).send("SOME ERROR OCCURED IN try-catch")
    }
})


// ROUTE - 14 :- ADD STORY TO USER PROFILE

router.post("/add/story",verifytoken,async(req,res)=>{
    const user = await Organization.findById(req.user.id);
    if(!user){
        return res.status(400).send("USER NOT FOUND ");
    }
    console.log(user);

    if(user.Stories.length==0){
        await user.updateOne({$push:{Stories:req.body.newstory},
                             $set:{StoryDescription:req.body.description}})
      
        res.status(200).send("STORY ADDED")
    }else if(user.Stories.length==1){
        await user.updateOne({$pull:{Stories:user.Stories[0]}})
        await user.updateOne({$push:{Stories:req.body.newstory},$set:{StoryDescription:req.body.description}})
        console.log("check story description : "+ user.StoryDescription);
        res.status(200).send("OLD STORY REMOVED AND NEW STORY ADDED")
    }
    else{
        return res.status(400).send("ONLY ONE STORY IS ALLOWED")
    }
})

// ROUTE - 15 :- get story of a user from his id

router.get("/viewstory/:id",async(req,res)=>{
    const user = await Organization.findById(req.params.id);
    if(!user){
        return res.status(400).send("USER NOT FOUND TO FETCH STORY")
    }
    console.log("user story here : "+user.Stories[0])
    return res.status(200).json({Image:user.Stories[0],Description:user.StoryDescription});
})

// ROUTE - 16 :- GET ALL USERS

router.get("/get/allusers",async(req,res)=>{
    console.log("all users route");
    try{
        const allUsers = await Organization.find();
        let allUsersList =[];

        allUsers.map((person)=>{
            const {password,...others}=person._doc;
            allUsersList.push(others)

        })
        // console.log(allUsersList);
        return res.status(200).json({allUsersList : allUsersList})
    }catch(error){
        return res.status(400).send("SOME ERROR OCCURED IN try-catch")
    }
})

// ROUTE - 17 :- GET 3 RANDOM POSTS FROM USERS OF TYPE 2

router.get("/get/ads", async (req, res) => {
    try {
        // Get three random users of type 2
        const randomUsers = await User.aggregate([
            { $match: { type: 2 } },
            { $sample: { size: 2 } }
        ]);

        // Extract user ids from randomUsers
        const userIds = randomUsers.map(user => user._id);


        // Get three random posts from these random users
        const randomPosts = await Post.aggregate([
            { $match: { user: { $in: userIds } } },
            { $sample: { size: 2 } }
        ]);
        console.log(randomPosts);
        return res.status(200).json({ randomPosts: randomPosts });
    } catch (error) {
        return res.status(400).send("SOME ERROR OCCURRED IN try-catch");
    }
});





module.exports = router;
