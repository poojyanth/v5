import React,{useState,useEffect} from 'react'
import "./profilerightbar.css"
import axios from "axios"
import { useSelector}  from 'react-redux'
// import image3 from "../Images/image3.jpg";
import Follow from '../RightsideContainer/Follow';

// import addfriend from "../Images/add-user.png";

export default function ProfileRightbar() {

  // const myUserId="656762a5c43095cb8ad3dc3c";

  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;

  const [followers,setFollowers] = useState([]);

  useEffect(()=>{
    const getfollowers=async()=>{
    try{   
        const response = await axios.get(`http://localhost:5000/api/user/get/followers/${id}`)
       
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

  
  const jwt_here="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njc2MmE1YzQzMDk1Y2I4YWQzZGMzYyIsInVzZXJuYW1lIjoiU0FJUEFWQU4iLCJpYXQiOjE3MDEzMjA0OTR9.3YHs-mLthGHdMRVS7SVWC0-yyhbF3CgEemL_ucXBnpU"
  const[suggestions,setSuggestions] = useState([]);

  useEffect(()=>{
    const getsuggestions =async()=>{
      try{
      const details = await axios.get(`http://localhost:5000/api/user/all/user/${id}`,{
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

      <div className='rightcontainer'>

      <h3>Followers</h3>

        <div >        

  {
    followers.map((item)=>{
      return <div className='FollowRequest' style={{marginTop:"10px",paddingTop:"5px",paddingBottom:"5px"}}>
      <div style={{display:'flex' , alignItems:"center" , marginLeft:10 , cursor:"pointer"}}>
       <img src={`${item.others.profilepicture}`} className="Friendsimage" alt="" />
       <p style={{textAlign:"start"  , marginLeft:"10px"}}>{item.others.username} Started Following You</p>
     </div>
   </div>

    })
  }
       


          
          
          
          
        </div>
        

      </div>

      <div className='rightcontainer2'>
         <h3 style={{textAlign:"start" , marginLeft:"10px"}}>Suggested for you</h3>

         {
suggestions.map((item)=>{


return <Follow user_details={item}/>

})
}

   




      </div>


    </div>
  )
}
