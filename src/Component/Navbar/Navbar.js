import React from 'react'
import "./Navbar.css"
import searchIcon from "../Images/search.png";
import Notifications from "../Images/bell.png";
import Message from "../Images/message.png";
import Profileimage from "../Images/Profile.png"
import { Link} from "react-router-dom";
import { useDispatch, useSelector}  from 'react-redux'
import {logout} from "../ReduxContainer/UserReducer"

export default function Navbar() {


  const userDetails = useSelector((state)=>state.user);


  let user2 = userDetails.user;

  let id =user2.user._id;
  console.log(id);

const dispatch = useDispatch();
  const handleLogOut=()=>{
       dispatch(logout());
  }

  return (
    <div className='mainNavbar'>
      
    <div className='LogoContainer'>
              <p>Social</p>
    </div>
  
    <div>
              <div className='searchInputContainer'>
                        <img src={`${searchIcon}`} className="searchIcon" alt="" />
                        <input type="text" className='searchInput' placeholder='search your friends' name="" id="" />
              </div>
    </div>
    <div className='IconsContainer'>
              <img src={`${Notifications}`} className="Icons" alt="" />
              <img src={`${Message}`} className="Icons" alt="" />
              <Link to={`/profilepage/${id}`}>
              <div style={{display:'flex' , alignItems:'center'}}>
                        <img src={`${user2.user.profilepicture}`} className="ProfileImage" alt="" />
                        <p style={{marginLeft:'5px'}}>{user2.user.username}</p>
              </div>
              </Link>
           
              <div style={{marginRight:"30px" , marginLeft:"20px" , cursor:"pointer"}} onClick={handleLogOut}>
                <p>Logout</p>
              </div> 
    </div>
</div>
  )
}
