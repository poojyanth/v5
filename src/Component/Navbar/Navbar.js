import React from 'react'
import "./Navbar.css"
import searchIcon from "../Images/search.png";
import Notifications from "../Images/bell.png";
import Message from "../Images/message.png";
import defaultUser from "../Images/blank-profile-picture-973460_960_720.webp"
import Profileimage from "../Images/Profile.png"
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector}  from 'react-redux'
import {logout} from "../ReduxContainer/UserReducer"


export default function Navbar() {

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;

const dispatch = useDispatch();
  const handleLogOut=()=>{
       dispatch(logout());
  }

  return (
    <div className='mainNavbar'>
      


        <div className='LogoContainer' onClick={handleLogoClick}>
                  <p >Fotoflask</p>
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
                        <img src={(user.user.profilepicture)?user.user.profilepicture:defaultUser} className="ProfileImage" alt="" />
                        <p style={{marginLeft:'5px'}}>{user.user.username}</p>
              </div>
              </Link>
           
              <div style={{marginRight:"30px" , marginLeft:"20px" , cursor:"pointer"}} onClick={handleLogOut}>
                <p>Logout</p>
              </div> 
    </div>
</div>
  )
}
