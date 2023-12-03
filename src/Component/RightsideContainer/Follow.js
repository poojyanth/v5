import React,{useState} from 'react'
import addfriend from "../Images/add-user.png";
import followed from "../Images/followed.png"
import { useSelector}  from 'react-redux'
export default function Follow(props) {

  
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;

    const jwt_here="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTg0NGFhYTFlZjE1OGM2ZTNjNjdlZCIsInVzZXJuYW1lIjoiVVNFUjIiLCJpYXQiOjE3MDAyODU0NDZ9.Oo2Vo_M0wmya9zQaCkWnVgkoC4jFji_HqgEri_JHgQs"
    const [followImg,setFollowImg] = useState([addfriend]);
    // const myUserId="656762a5c43095cb8ad3dc3c";
    
    const handleFollow=async(clicked_user_id)=>{
         console.log(clicked_user_id)
         await fetch(`http://localhost:5000/api/user/follow/${clicked_user_id}`,{method:"PUT" ,
         headers:{
           'Content-Type':'application/json',
           jwttoken:jwt_here
         }, body: JSON.stringify({ user:id})})
         setFollowImg(followed)
    }

  return (
    <div style={{marginTop:"-10px"}} key={props.user_details._id}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  
      <div style={{ display: 'flex', alignItems: "center" }}>
        <img src={`${props.user_details.profilepicture}`} className="Profileimage" alt="" />
        <div>
          <p style={{ marginLeft: "10px" , textAlign:'start' }}>{props.user_details.username}</p>
          <p style={{ marginLeft: "10px" , textAlign:'start' , marginTop:"-16px" , fontSize:"11px" , color:"#aaa" }}>Suggested for you</p>
        </div>
      </div>
    
      <div style={{ backgroundColor: "#aaa", padding: '10px', marginRight: 13, borderRadius: "50%" , cursor:'pointer' }} >
        <img src={`${followImg}`} className="addfriend" alt="" onClick={(e)=>handleFollow(props.user_details._id)}  />
      </div>
    </div>
  </div>
  )
}
