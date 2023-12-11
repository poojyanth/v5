import React, { useEffect, useState } from 'react'
import Contentpost from '../../Component/ContentpostContainer/Contentpost'
import Post from '../PostContainer/Post'
import "./mainpost.css"
import axios from "axios"
import { useSelector}  from 'react-redux'

export default function Mainpost() {

  const userDetails = useSelector((state)=>state.user);
  const Backendport = process.env.REACT_APP_BACKEND_PORT;
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken
  const [posts,setPosts] = useState([]);

  const getposts = async()=>{   
    try{
      const response = await axios.get(`http://localhost:${Backendport}/api/user/followingposts/${id}`,{
        headers:{
          jwttoken:jwt_here // must be the attribute name (same name as in headers )-> i.e jwttoken
        }
      });
      setPosts(response.data);  // include particularly .followingPosts 
                                              //otherwise it returns an data object
  }catch(error){

  }
  }

  useEffect(()=>{
    getposts();
  },[])

  const reloadMainpost = () => {
    getposts(); // Reload the posts
  };

  console.log(posts);

    return (
      <div className='mainPostContainer'>
      <Contentpost reloadMainpost={reloadMainpost} />

    
      {
        
        posts.map((item)=>{
          // return item.map((postdetails)=>{
            return <Post  key={item.id}  post={item}/>
          // })
        })


      }   
      
    </div>
    )
}
