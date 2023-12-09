const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const SECRETKEY = "$@IP@V@N";

const { body, validationResult } = require('express-validator');
const User = require('../Modals/User');
const { verifytoken } = require('../middleware/verifytoken');
const Post = require('../Modals/Post');


// ROUTE-1 :- CREATE NEW USER
// METHOD USED :- POST
router.post("/create/user", [
    body('username', 'USERNAME MUST HAVE MINIMUM LENGTH 3').isLength({ min: 3 }),
    body('email', 'EMAIL MUST HAVE MINIMUM LENGTH 5').isLength({ min: 5 }),
    body('password', 'PASSWORD MUST HAVE MINIMUM LENGTH 3').isLength({ min: 3 }),
    body('phonenumber', 'PHONENUMBER MUST HAVE MINIMUM LENGTH 10').isLength({ min: 10 }),
], async (req, res) => {

    // check if any errors in validation
    const errors = validationResult(req); // USE req NOT req.body HERE
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log(req.body);
        // check if user with given email already exists

        // let user = await User.findOne({ email: req.body.email });
        // if (user) {
        //     console.log('user already exists');
        //     return res.status(400).json("A USER WITH THIS EMAIL ALREADY EXISTS , PLEASE LOGIN")
        // }

        console.log('user does not exists');

        // generate salt for password hashing
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        console.log(req.body);

        // if no user exists -> create new user
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: securePassword,
            phonenumber: req.body.phonenumber,
            profilepicture: req.body.profilepicture,
        }).save().then((user) => {
            console.log(user);
        });

        const jwttoken = await jwt.sign({
            id:user._id,
            username:user.username
        },SECRETKEY);

        // await user.save();
        console.log(user);

        res.status(200).json({ msg: "NEW USER CREATED SUCCESSFULLY", user,jwttoken });

    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /create/user route:" + error)
    }

})


// ROUTER-2:- USER LOGIN

router.post("/login", [
    body('email', 'EMAIL MUST HAVE MINIMUM LENGTH 5').isLength({ min: 5 }),
    body('password', 'USERNAME MUST HAVE MINIMUM LENGTH 3').isLength({ min: 3 })], async (req, res) => {

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
         const user = await User.findOne({email:req.body.email});
        
        if(!user){
           res.status(400).json("NO USER EXISTS WITH GIVEN EMAIL ID");
        }

        const comparePassword = await bcrypt.compare(req.body.password,user.password);

        if(!comparePassword){
            res.status(400).json("INCORRECT PASSWORD");
        }

        const jwttoken = await jwt.sign({
            id:user._id,
            username:user.username
        },SECRETKEY);

        res.status(200).json({msg:"USER FOUND",user,jwttoken});
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
    if(req.params.id !== req.body.user){
        const user = await User.findById(req.params.id);
        const otheruser = await User.findById(req.body.user);

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
router.get("/followingposts/:id",verifytoken, async (req, res) => {

    try {

     const user2 = await User.findById(req.params.id);
  
     const followingPosts = await Promise.all(
        user2.following.map((each_following_user_account)=>{
            return Post.find({user:each_following_user_account})
        })
     )

     const your_posts = await Post.find({user:user2._id});


     res.status(200).json(your_posts.concat(...followingPosts));


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /follow/ "+error );
    }

})



// ROUTE-4 :- UPDATE USER PASSWORD
// METHOD USED :- PUT

router.put("/update/:id",verifytoken, async (req, res) => {

    try {
        if(req.params.id === req.user.id){

        if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        req.body.password=securePassword;
        const updateuser = await User.findByIdAndUpdate(req.params.id,{
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


// ROUTE-4 :- DELETE USER ACCOUNT
// METHOD USED :- DELETE

router.delete("/delete/:id",verifytoken, async (req, res) => {

    try {

        if(req.params.id !== req.user.id){
            return res.status(400).json("CANNOT DELETE OTHERS ACCOUNT");
        }

      const user = await User.findByIdAndDelete(req.params.id)
      res.status(200).json({msg:"ACCOUNT DELETED SUCCESSFULLY",user});


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /delete/:id " + error );
    }

})


// GET USER DETAILS FOR A POST

router.get("/post/user/details/:id",async(req,res)=>{
    try{
    const user = await User.findById(req.params.id);
    if(!user){
        req.status(400).send("CAN'T GET USER FOR A POST");
    }
    const {email,password,phonenumber,...others}= user._doc;
    // remaining details will be stores in others variable
    // others contain username,profilpicture
    res.status(200).send(others);
}catch(error){
    return res.status(400).send("SOME ERROR IN TRY_ CATCH (get user for a post)")
}

})


// GET USERS TO FOLLOW
// i.e :- GET USERS IN SUGGESTED FOR YOU LIST
// THOSE ARE USERS THAT ARE NOT IN YOUR FOLLOWING LIST (array)

router.get("/all/user/:id",verifytoken,async(req,res)=>{
    try{

        const allUsersInDb = await User.find();
        const current_user = await User.findById(req.params.id);

        const followingsOfCurrent_user = await Promise.all(
            current_user.following.map((item)=>{
                return item;
            })
        )

        let UsersNotFollowed = await allUsersInDb.filter((val)=>{
            return !followingsOfCurrent_user.find((item)=>{
                return val._id.toString()===item;
            })
        })

        let SuggestedForYouList = await Promise.all(
            UsersNotFollowed.map((item)=>{
                const{email,phonenumber,password,followers,following,...others} = item._doc;
                return others
            })
        )

        res.status(200).send(SuggestedForYouList);

    }catch(error){
        
        res.status(400).send("SOME ERROR OCCURED IN TRY_CATCH")
    }
})


// GET FOLLOWING LIST OF LOGGED IN USER

router.get("/get/followings/:id",async(req,res)=>{
    try{

        const user = await User.findById(req.params.id);
        const followings = await Promise.all(
            user.following.map((item)=>{
                return User.findById(item);
            })
        )

        let followingList =[];

        followings.map((person)=>{
            const {email,passsword,phonenumber,followers,following,...others}=person._doc;
            followingList.push({others})
        })


        res.status(200).send(followingList)
    }catch(error){
        
        return res.status(400).send("SOME ERROR OCCURED IN try-catch")
    }
})


// GET FOLLOWERS LIST OF LOGGED IN USER

router.get("/get/followers/:id",async(req,res)=>{
    try{

        const user = await User.findById(req.params.id);
        const FFollowers = await Promise.all(
            user.followers.map((item)=>{
                return User.findById(item);
            })
        )

        let FFollowersList =[];

        FFollowers.map((person)=>{
            const {email,passsword,phonenumber,followers,following,...others}=person._doc;
            FFollowersList.push({others})
        })


        res.status(200).send(FFollowersList)

    }catch(error){
        
        return res.status(400).send("SOME ERROR OCCURED IN try-catch")
    }
})
module.exports = router;
