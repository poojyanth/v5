import React,{useState,useEffect} from 'react'
import "./profileleftbar.css"
import image3 from "../Images/image3.jpg";
import axios from "axios"
import { useSelector}  from 'react-redux'
import { useLocation } from 'react-router-dom';
import { Link} from "react-router-dom";
import Profilecover from "../Images/default-cover-4.jpeg"
import defaultUser from "../Images/blank-profile-picture-973460_960_720.webp"
import Alert from 'antd/es/alert/Alert';

export default function ProfileLeftbar({profileid}) {

  console.log("PROFILE ID :"+profileid);
  const userDetails = useSelector((state)=>state.user);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken
  // let followerscount = user.user.followers.length;
  // let followingcount = user.user.following.length;
  // let profilepic = user.user.profilepicture;

  // const myUserId="656762a5c43095cb8ad3dc3c";

  const [user_details,setUser_Details] = useState([]);
  const [followings,setFollowings] = useState([]);
 
  useEffect(()=>{
    const getuserdetails =async()=>{
      try{
      const details = await axios.get(`${BACKEND_URI}/api/user/post/user/details/${profileid}`,{
        headers:{
          jwttoken:jwt_here
        }
      });
      setUser_Details(details.data);
      }catch(error){
        console.log("ERROR OCCURED IN CATCH BLOCK"+error)
      }
    }
    // alert("PROFILE ID :"+profileid);
    getuserdetails();
    console.log("USER DETAILS :"+user_details);
    const getfollowings=async()=>{
      try{   

          const response = await axios.get(`${BACKEND_URI}/api/user/get/followings/${profileid}`,{
            headers:{
              jwttoken:jwt_here
            }
          })
          // console.log("RESS :"+response)
          setFollowings(response.data);
          }catch(error){
            console.log("SOME ERROR IN CATCH BLOCK "+error);
          }
        }
       getfollowings();
  },[profileid])

  console.log("FFF")
  console.log(followings);

  let followerscount = user_details?.followers?.length;
  let followingcount = user_details?.following?.length;
  let profilepic = user_details?.profilepicture;

 
  const [Follow,setUnFollow] = useState([user.user.following.includes(profileid) ? "UnFollow" : "Follow" ]);

// const handleFollow=async()=>{
//   await fetch(`${BACKEND_URI}/api/user/follow/${id}`,{method:"PUT" ,
//   headers:{
//     'Content-Type':'application/json',
//     jwttoken:jwt_here
//   }, body: JSON.stringify({ user:user.user._id})})
//   setUnFollow("UnFollowed")
// }
 
const handleFollow = async()=>{
  if(Follow === "Follow"){
    await fetch(`${BACKEND_URI}/api/user/follow/${profileid}` , {method:'PUT', headers:{'Content-Type':"application/JSON" , jwttoken:jwt_here} , body:JSON.stringify({user:`${user.user._id}`})})
    setUnFollow("UnFollow")
  }else{
    await fetch(`${BACKEND_URI}/api/user/follow/${profileid}` , {method:'PUT', headers:{'Content-Type':"application/JSON" , jwttoken:jwt_here} , body:JSON.stringify({user:`${user.user._id}`})})
    setUnFollow("Follow")
  }
}




  return (
    <div className='ProfileLeftbar'>

      <div className='NotificationsContainer UserInfo' style={{height: '55vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>


        <img src={`${Profilecover}`} className="ProfilepageCover" alt="" />
        <div style={{ display: 'flex', alignItems: 'center', marginTop: -20 }}>
          <img src={(user_details.profilepicture)?user_details.profilepicture:defaultUser} className="Profilepageimage" alt="" />
          <div>
            <p style={{ marginLeft: 6, marginTop: 20, color: "black", textAlign: 'start' }}>{user_details.username}</p>
            <p style={{ marginLeft: 6, color: "black", textAlign: "start", marginTop: -16, fontSize: 11 }}>Software Developer</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>Followings</p>
          <p style={{ color: "black", marginRight: 20, fontSize: "12px", marginTop: 17 }}>{followingcount}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -20 }}>
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>Followers</p>
          <p style={{ color: "black", marginRight: 20, fontSize: "12px", marginTop: 17 }}>{followerscount}</p>
        </div>
        <div style={{ marginTop: -20 }}>
          <h5 style={{ color: "black", marginLeft: 10, fontSize: "14px", marginRight: 30, marginTop: 30, textAlign: "start" }}>User bio</h5>
          <p style={{ color: "black", fontSize: "12px", marginTop: -20, textAlign: "start", marginLeft: "10px" }}>I would rather be despised of who I am, rather than loved by who I am not.</p>
        </div>
        { user.user._id !== profileid ? <div onClick={handleFollow}> <button style={{ width: "100%", paddingTop: 7, paddingBottom: 7, border: "none", backgroundColor: "green", color: "white", borderBottomRightRadius: '20px', borderBottomLeftRadius: '20px' }}>{Follow}</button></div> : <button style={{ width: "100%", paddingTop: 7, paddingBottom: 7, border: "none", backgroundColor: "green", color: "white", borderBottomRightRadius: '20px', borderBottomLeftRadius: '20px' }}>Edit Bio</button> }




      </div>

      <div className='NotificationsContainer'>
        <h3>Followings</h3>
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <p style={{ marginLeft: 10 }}>Friends</p>
          <p style={{ marginRight: 10, color: "var(--secondary-text-color)" }}>See all</p>
        </div>
        <div style={{ display: 'flex', flexWrap: "wrap",flexDirection: 'row', justifyContent: 'center' }}>


        {
          //he issue you're facing might be because you're not explicitly returning the JSX inside the map function. In arrow functions, if you use curly braces {}, you need to use the return statement explicitly. If you want to use parentheses (), you can skip the return statement.
        followings.map((item)=>(
          <Link to={`/profilepage/${item.others._id}`} key={item.others._id} style={{width: '4pc',height: '4pc', cursor: "pointer", margin: '5px', textDecoration: 'none', color: 'black', overflowX: 'clip' }}>
          
          <img src={`${(item.others.profilepicture)?item.others.profilepicture:defaultUser}`} className="friendimage" alt="" />
          <p style={{ marginTop: -2 }}>{item.others.username}</p> 
        </Link>

        ))
        }




        </div>

      </div>

    </div>
  )
}
