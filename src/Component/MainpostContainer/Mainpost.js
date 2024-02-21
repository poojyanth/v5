import React, { useEffect, useState } from 'react'
import Contentpost from '../../Component/ContentpostContainer/Contentpost'
import Post from '../PostContainer/Post'
import Stories from '../Storiescontainer/Stories'
import "./mainpost.css"
import axios from "axios"
import { useSelector}  from 'react-redux'

const LoadingAnimation = () => {
  return (
<div className="loading-animation">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default function Mainpost() {

  const userDetails = useSelector((state)=>state.user);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken
  // alert(jwt_here)
  const [posts,setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  const getposts = async()=>{   
    try{
      const response = await axios.get(`${BACKEND_URI}/api/user/followingposts/${id}`,{
        headers:{
          jwttoken:jwt_here // must be the attribute name (same name as in headers )-> i.e jwttoken
        }
      });
      setPosts(response.data);  // include particularly .followingPosts 
                                              //otherwise it returns an data object
      setLoading(false);
  }catch(error){
    setLoading(false);
  }
  }

  useEffect(()=>{
    getposts();
  },[])

  const reloadMainpost = () => {
    setLoading(true);
    getposts(); // Reload the posts
  };

  console.log(posts);

    return (
      <div className='mainPostContainer'>
        <Stories/>
      <Contentpost reloadMainpost={reloadMainpost} />

    
      {loading ? ( // If loading, display loading animation
        <LoadingAnimation />
      ) : (
        posts.map((item) => {
          return <Post key={item.id} post={item} />;
        })
      )}
      
    </div>
    )
}
