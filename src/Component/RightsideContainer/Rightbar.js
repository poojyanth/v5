import React, { useEffect, useState } from 'react'
import "./rightbar.css"
import image3 from "../Images/default-cover-4.jpeg";
import ads from "../Images/ads.jpg";
import { useSelector}  from 'react-redux'
// import addfriend from "../Images/add-user.png";
import axios from "axios";
import Follow from './Follow';

export default function Rightbar() {

  const userDetails = useSelector((state)=>state.user);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken
  
  const[suggestions,setSuggestions] = useState([]);

  useEffect(()=>{
    const getsuggestions =async()=>{
      try{
      const details = await axios.get(`${BACKEND_URI}/api/user/all/user/${id}`,{
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







  return (
<div className='rightbar'>
      <div className='rightcontainer'>

        <div className='adsContainer'>
          <img src={`${image3}`} className="adsimg" alt="" />
          <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>Fotoflask</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Ads Go here</p>
          </div>
        </div>
        <div className='adsContainer'>
          <img src={`${image3}`} className="adsimg" alt="" />
          <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>Fotoflask</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Ads go here</p>
          </div>
        </div>
        <div className='adsContainer'>
          <img src={`${image3}`} className="adsimg" alt="" />
          <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>Fotoflask</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Ads Go here</p>
          </div>
        </div>
        

      </div>

      <div className='rightcontainer'>
         <h3 style={{textAlign:"start" , marginLeft:"10px"}}>Suggested for you</h3>


{
suggestions.map((item)=>{

//   return <div style={{marginTop:"-10px"}} id={item._id} >
//   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

//     <div style={{ display: 'flex', alignItems: "center" }}>
//       <img src={`${item.profilepicture}`} className="Profileimage" alt="" />
//       <div>
//         <p style={{ marginLeft: "10px" , textAlign:'start' }}>{item.username}</p>
//         <p style={{ marginLeft: "10px" , textAlign:'start' , marginTop:"-16px" , fontSize:"11px" , color:"#aaa" }}>Suggested for you</p>
//       </div>
//     </div>
  
//     <div style={{ backgroundColor: "#aaa", padding: '10px', marginRight: 13, borderRadius: "50%" , cursor:'pointer' }} >
//       <img src={`${addfriend}`} className="addfriend" alt=""  />
//     </div>
//   </div>
// </div>

return <Follow  key={item._id} user_details={item}/>

})
}

  

      

        

      </div>


    </div>
  )
}
