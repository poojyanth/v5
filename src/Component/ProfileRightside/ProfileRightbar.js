import React,{useState,useEffect} from 'react'
import "./profilerightbar.css"
import defaultUser from "../Images/blank-profile-picture-973460_960_720.webp"
import axios from "axios"
import { useSelector}  from 'react-redux'
// import image3 from "../Images/image3.jpg";
import Follow from '../RightsideContainer/Follow';

// import addfriend from "../Images/add-user.png";

export default function ProfileRightbar({profileid}) {

  
  // const myUserId="656762a5c43095cb8ad3dc3c";
  const Backendport = process.env.REACT_APP_BACKEND_PORT;
  
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken

  const [followers,setFollowers] = useState([]);

  useEffect(()=>{
    const getfollowers=async()=>{
    try{   
        const response = await axios.get(`http://localhost:${Backendport}/api/user/get/followers/${id}`)
       
        setFollowers(response.data);
        }catch(error){
          console.log("SOME ERROR IN CATCH BLOCK "+error);
        }
      }
     getfollowers();
  }
  ,[]);

  console.log(followers);


  // FOR SUGGESTIONS 

  
  
  const[suggestions,setSuggestions] = useState([]);

  useEffect(()=>{
    const getsuggestions =async()=>{
      try{
      const details = await axios.get(`http://localhost:${Backendport}/api/user/all/user/${id}`,{
        headers:{
          jwttoken:jwt_here
        }
      });
      setSuggestions(details.data);
      }catch(error){
        console.log("ERROR OCCURED IN CATCH BLOCK"+error)
      }
    }
    getsuggestions();
  },[])

  console.log(suggestions);


  return (
<div className='Profilerightbar'>

      <div className='rightcontainer rightcontainer2'>

      <h3>Followers</h3>

        <div >        

  {
    followers.map((item)=>{
      return <div className='FollowRequest' key={item.others._id} style={{marginTop:"10px",paddingTop:"5px",paddingBottom:"5px"}}>
      <div style={{display:'flex' , alignItems:"center" , marginLeft:10 , cursor:"pointer"}}>
       <img src={`${(item.others.profilepicture)?item.others.profilepicture: defaultUser}`} className="Friendsimage" alt="" />
       <p style={{textAlign:"start"  , marginLeft:"10px"}}>{item.others.username} Started Following You</p>
     </div>
   </div>

    })
  }
       
        </div>
        

      </div>

      <div className='rightcontainer2 '>
         <h3 style={{textAlign:"start" , marginLeft:"10px"}}>Suggested for you</h3>

         {
suggestions.map((item)=>{


return <Follow  key={item._id} user_details={item}/>

})
}

   




      </div>


    </div>
  )
}
