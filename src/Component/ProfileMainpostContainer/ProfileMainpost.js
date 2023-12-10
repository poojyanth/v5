import React,{useEffect,useState} from 'react'
import Post from '../PostContainer/Post'
import Contentpost from '../../Component/ContentpostContainer/Contentpost'
import image3 from "../Images/image3.jpg";
import "./profilemainpost.css"
import { useLocation } from 'react-router-dom';
import axios from "axios"


export default function ProfileMainpost({profileid}) {

  const Backendport = process.env.REACT_APP_BACKEND_PORT;
 //const jwt_here="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njc2MmE1YzQzMDk1Y2I4YWQzZGMzYyIsInVzZXJuYW1lIjoiU0FJUEFWQU4iLCJpYXQiOjE3MDEzMjA0OTR9.3YHs-mLthGHdMRVS7SVWC0-yyhbF3CgEemL_ucXBnpU"
const [posts,setPosts] = useState([]);

useEffect(()=>{
  const getposts = async()=>{   
    try{
      const response = await axios.get(`http://localhost:${Backendport}/api/post/get/post/${profileid}`,{
      });

      setPosts(response.data);  // include particularly .followingPosts 
                                               //otherwise it returns an data object
  }catch(error){
        console.log("SOME ERROR IN CATCH :" + error)
  }
  }
getposts();
},[profileid])

console.log(posts);

  return (
    <div className='mainPostContainer ProfilePageMainPost'>

      <div>
        <img src={`${image3}`} className="profileCoverimage" alt="" />
        <h2 style={{ marginTop: -43, color: "white", textAlign: "start", marginLeft: "34px" }}>Your Profile</h2>
      </div>
      <Contentpost/>
      {
   
   posts.map((item)=>{

     return <Post post={item} key={item._id}/>
    
   })
 
 
 }

    </div>
  )
}
