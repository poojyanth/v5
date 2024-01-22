import React, { useEffect, useState } from 'react'
import Contentpost from '../ContentpostContainer/Contentpost'
import Post from '../PostContainer/Post'
import axios from "axios"
import { useSelector}  from 'react-redux'
export default function Likedposts() {

  const userDetails = useSelector((state)=>state.user);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken
const [posts,setPosts] = useState([]);

useEffect(()=>{
  const getposts = async()=>{   
    try{
      const response = await axios.get(`${BACKEND_URI}/api/post/get_all_liked_posts`,{
        headers:{
          jwttoken:jwt_here // must be the attribute name (same name as in headers )-> i.e jwttoken
        }
      });
      // before firebase used user  setPosts(response.data.followingPosts);
      setPosts(response.data);  // include particularly .followingPosts 
                                               //otherwise it returns an data object
  }catch(error){

  }
  }
getposts();
},[])

console.log(posts);

  return (
    <div className='mainPostContainer'>
  
{ 
  posts.map((item)=>{
    // return item.map((postdetails)=>{
      return <Post  key={item.id}  post={item}/>
    // })
  })
}

{/* {
  Array.isArray(posts) && posts.length > 0 ? (
    posts.map((item) =>
      item.map((postdetails) => <Post key={postdetails.id} post={postdetails} />)
    )
  ) : (
    <p>No posts available</p>
  )
} */}
   
    
  </div>
  )
}
