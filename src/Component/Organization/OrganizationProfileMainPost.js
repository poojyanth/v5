import React,{useEffect,useState} from 'react'
import Post from '../PostContainer/Post'
import Contentpost from '../ContentpostContainer/Contentpost'
import image3 from "../Images/default-cover-4.jpeg";
import "./Organization.css"
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { useSelector}  from 'react-redux'


export default function OrganizationProfileMainpost({profileid}) {



  const userDetails = useSelector((state)=>state.user);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken
  
  const [posts,setPosts] = useState([]);

const getposts = async()=>{   
  try{
    const response = await axios.get(`${BACKEND_URI}/api/post/get/post/${profileid}`,{
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

const getUserData = async (Uid) => {
  try {
    const response = await axios.get(
      `${BACKEND_URI}/api/user/user/details/${Uid}`,
      {
        headers: {
          jwttoken: jwt_here,
        },
      }
    );
    return response.data.user;
  } catch (error) {}
};


const reloadMainpost = () => {
  getposts(); // Reload the posts
};

  return (
    <div className='mainPostContainer ProfilePageMainPost' style={{width: '90%'}}>

      <div>
        <img src={`${image3}`} className="profileCoverimage" alt="" />
        <h2 style={{ marginTop: -43, color: "white", textAlign: "start", marginLeft: "5%" }}>Post Stats</h2>
      </div>
      
      {
   
   posts.map((item)=>{

     return (
      <div style={{display: 'flex', flexDirection:'row', width: '100%'}}>
        <div style={{width: '50%'}}><Post post={item} key={item._id}/></div>
        <div className='OrganizationPagePostStats'>
          <div className='OrganizationPagePostStatstags'>
            <h5>Tags {item.tags.length}</h5>
            <p>{item.tags}</p>
          </div>
          <h5>Likes: {item.likes.length}</h5>
          <div className='OrganizationPagePostStatsLikes'>
            <p>{item.likes.map((Uid)=> {
              return <p>{Uid}</p>
            })}</p>
          </div>
          <h5>Comments: {item.comments.length}</h5>
          <div className='OrganizationPagePostStatsComments'>
            <p>{item.comments.map((comment)=> {
              return (
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
              <p>{comment.username}</p>
              <p>{comment.comment}</p>
                </div>
              )
            })}</p>
        </div>
        </div>
      </div>
     )
    
   })
 
 
 }

    </div>
  )
}
