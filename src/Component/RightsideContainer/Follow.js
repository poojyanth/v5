import React,{useState} from 'react'
import { Link } from "react-router-dom";
import addfriend from "../Images/add-user.png";
import followed from "../Images/t5.png"
import { useSelector}  from 'react-redux'
import defaultUser from "../Images/blank-profile-picture-973460_960_720.webp"
export default function Follow(props) {

  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken

  
    const [followImg,setFollowImg] = useState([addfriend]);
    // const myUserId="656762a5c43095cb8ad3dc3c";
    
    const handleFollow=async(clicked_user_id)=>{
         console.log(clicked_user_id)
         await fetch(`${BACKEND_URI}/api/user/follow/${clicked_user_id}`,{method:"PUT" ,
         headers:{
           'Content-Type':'application/json',
           jwttoken:jwt_here
         }, body: JSON.stringify({ user:id})})
         setFollowImg(followed)
    }

  return (
    <div style={{marginTop:"-10px"}} key={props.user_details._id}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Link to={`/profilepage/${props.user_details._id}`} style={{color: 'black', textDecoration: 'none'}}>
      <div style={{ display: 'flex', alignItems: "center" }}>
        <img src={`${(props.user_details.profilepicture)?props.user_details.profilepicture: defaultUser}`} className="Profileimage" alt="" />
        <div>
          <p style={{ marginLeft: "10px" , textAlign:'start' }}>{props.user_details.username}</p>
          <p style={{ marginLeft: "10px" , textAlign:'start' , marginTop:"-16px" , fontSize:"11px" , color:"#aaa" }}>Suggested for you</p>
        </div>
      </div>
      </Link>
      <div style={{ backgroundColor: "#aaa", padding: '10px', marginRight: 13, borderRadius: "50%" , cursor:'pointer' }} >
        <img src={`${followImg}`} style={{backgroundColor:'#aaa'}} className="addfriend" alt="" onClick={(e)=>handleFollow(props.user_details._id)}  />
      </div>
    </div>
  </div>
  )
}

