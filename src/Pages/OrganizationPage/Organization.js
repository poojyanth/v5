import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import ProfileLeftbar from '../../Component/ProfileLeftsideContainer/ProfileLeftbar'
import ProfileRightbar from '../../Component/ProfileRightside/ProfileRightbar'
import ProfileMainPost from '../../Component/ProfileMainpostContainer/ProfileMainpost'
import "./Organization.css"
import OrganizationProfile from '../../Component/Organization/OrganizationProfile'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCardClip } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import defaultUser from "../../Component/Images/blank-profile-picture-973460_960_720.webp"

export default function Organization() {

  const userDetails = useSelector((state)=>state.user);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  let user = userDetails.user;
  
  const jwt_here=user.jwttoken
  const [option, setOption] = useState(0);
  const [showsidepanel, setShowsidepanel] = useState(false);
  const [user_details,setUser_Details] = useState([]);
  const [followings,setFollowings] = useState([]);

  const id = useParams(':id');
  return (
    <div className='OrganizationProfileContainer'>
    <Navbar/>
    <div className='OrganizationSubContainer'>
      <div className='OrganizationLeftContainer' onMouseOver={() => setShowsidepanel(true)} onMouseOut={() => setShowsidepanel(false)}>
        <div className='OrganizationLeftProfileContainer'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',padding: '5%'}}>
            <img src={(user_details.profilepicture)?user_details.profilepicture:defaultUser} className="OrganizationProfileImage" alt="" />          
        </div>
        </div>
        <div className='OrganizationProfileOptionContainer'>
          <div className='OrganizationProfileOptionItem' onClick={() => setOption(0)}><FontAwesomeIcon icon={faIdCardClip} /><br/>{showsidepanel? 'Profile' : ''}</div>
          <div className='OrganizationProfileOptionItem' onClick={() => setOption(1)}>Posts</div>
          <div className='OrganizationProfileOptionItem' onClick={() => setOption(2)}>Events</div>
          <div className='OrganizationProfileOptionItem' onClick={() => setOption(3)}>Members</div>
          </div>
        </div>
      <div className='OrganizationRightContainer'>
        {option === 0 && <OrganizationProfile/>}
        {option === 1 && <ProfileMainPost profileid={id.id}/>}
        {option === 2 && <div>Events</div>}
        {option === 3 && <div>Members</div>}
      </div>
    </div>
</div>
  )
}
