import React from 'react'
import "./leftbar.css"
import image3 from "../Images/SAIPAVAN.jpg";
import axios from "axios";
import {useEffect,useState} from 'react';
import {useSelector}  from 'react-redux'
import { Link} from "react-router-dom";

export default function Leftbar() {
  const userDetails = useSelector((state)=>state.user);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  let user = userDetails.user;
  let id =user.user._id;

const jwt_here=user.jwttoken;
const [posts,setPosts] = useState([]);

useEffect(()=>{
  const getposts = async()=>{   
    try{
      const response = await axios.get(`${BACKEND_URI}/api/user/followingposts/${id}`,{
        headers:{
          jwttoken:jwt_here // must be the attribute name (same name as in headers )-> i.e jwttoken
        }
      });
      // before firebase used user  setPosts(response.data.followingPosts);
      setPosts(response.data);  // include particularly .followingPosts 
                                               //otherwise it returns an data object
  }catch(error){
       console.log("ERROR OCCURED IN CATCH BLOCK "+error);
  }
  }
getposts();
},[])

console.log(posts);



  return (
    <div className='Leftbar'>
      
    <div className='NotificationsContainer'>
              <div className='containerHead'>
                                  <p >Notifications</p>
                                  <p style={{ color: "var(--secondary-text-color)" }}>See all</p>
              </div>
              <div className='ScrollContainerDisNone'>
              <div className='notificationItem' >
                        <img src={`${image3}`} className="notificationimg" alt="" />
                        <p style={{ color:"var(--secondary-text-color)" , fontSize:13 , width:"120px" , textAlign:"start"}}>Madan like your post</p>
                        <img src={`${image3}`} className="likeimage" alt="" />
              </div>
              <div className='notificationItem'>
                        <img src={`${image3}`} className="notificationimg" alt="" />
                        <p style={{ color:"var(--secondary-text-color)" , fontSize:13 , textAlign:"start" , width:"120px"}}>Suman started to following you</p>
                        <img src={`${image3}`} className="followinguserimage" alt="" />
              </div>
              <div className='notificationItem'>
                        <img src={`${image3}`} className="notificationimg" alt="" />
                        <p style={{  color:"var(--secondary-text-color)" , fontSize:13 , width:"120px" , textAlign:"start"}}>Madan like your post</p>
                        <img src={`${image3}`} className="likeimage" alt="" />
              </div>
              <div className='notificationItem'>
                        <img src={`${image3}`} className="notificationimg" alt="" />
                        <p style={{ color:"var(--secondary-text-color)" , fontSize:13 , width:"120px" , textAlign:"start"}}>Madan like your post</p>
                        <img src={`${image3}`} className="likeimage" alt="" />
              </div>

              <div className='notificationItem'>
                        <img src={`${image3}`} className="notificationimg" alt="" />
                        <p style={{ color:"var(--secondary-text-color)" , fontSize:13 , width:"120px" , textAlign:"start"}}>Madan like your post</p>
                        <img src={`${image3}`} className="likeimage" alt="" />
              </div>
              </div>

            
       
    </div>

    <div className='NotificationsContainer'>
              <div className='containerHead'>
                        <p >Explore</p>
                        <Link to="/explorepage" style={{ color: "var(--secondary-text-color)", textDecoration: 'none' }}><p >See all</p></Link>
              </div>
              
              <div className='ExploreImageContainer ScrollContainerDisNone'>
                {           
                  posts.map((item)=>{
                    // return item.map((postdetails)=>{
                      if(item.image){
                        return <img src={`${item.image}`} className="exploreimage" alt="" />
                      }
                      else
                      return <></>
                    // })
                  })
                  
                  }
              </div>
              
    </div>

</div>
  )
}
