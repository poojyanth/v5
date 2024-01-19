import React,{useEffect,useState} from 'react'
import Post from '../PostContainer/Post'
import Contentpost from '../../Component/ContentpostContainer/Contentpost'
import image3 from "../Images/default-cover-4.jpeg";
import "./profilemainpost.css"
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { useSelector}  from 'react-redux'


export default function ProfileMainpost({profileid}) {



  const userDetails = useSelector((state)=>state.user);
  const Backendport = process.env.REACT_APP_BACKEND_PORT;
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken
  
  const [posts,setPosts] = useState([]);

const getposts = async()=>{   
  try{
    const response = await axios.get(`http://localhost:${Backendport}/api/post/get/post/${profileid}`,{
      headers:{
        jwttoken:jwt_here // must be the attribute name (same name as in headers )-> i.e jwttoken
      }
    });

    setPosts(response.data);  // include particularly .followingPosts 
                                             //otherwise it returns an data object
}catch(error){
      console.log("SOME ERROR IN CATCH :" + error)
}
}

useEffect(()=>{
  
getposts();
},[profileid])



const reloadMainpost = () => {
  getposts(); // Reload the posts
};

  return (
    <div className='mainPostContainer ProfilePageMainPost'>

      <div>
        <img src={`${image3}`} className="profileCoverimage" alt="" />
        <h2 style={{ marginTop: -43, color: "white", textAlign: "start", marginLeft: "34px" }}>Your Profile</h2>
      </div>
      <Contentpost reloadMainpost={reloadMainpost}/>
      {
   
   posts.map((item)=>{

     return <Post post={item} key={item._id}/>
    
   })
 
 
 }

    </div>
  )
}
