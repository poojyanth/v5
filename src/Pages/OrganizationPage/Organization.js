import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import "./Organization.css"
import axios from 'axios'
import { useEffect } from 'react'
import OrganizationProfile from '../../Component/Organization/OrganizationProfile'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCardClip,faImage } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import defaultUser from "../../Component/Images/blank-profile-picture-973460_960_720.webp"
import OrganizationProfileMainpost from '../../Component/Organization/OrganizationProfileMainPost'

export default function Organization() {

  const id = useParams(':id');
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  const jwt_here=user.jwttoken
  const [user_details,setUser_Details] = useState([]);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URI}/api/user/user/details/${id.id}`,
        {
          headers: {
            jwttoken: jwt_here,
          },
        }
      );
      setUser_Details(response.data.user);
    } catch (error) {}
  };

  const [followings,setFollowings] = useState([]);
  const getFollowings = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URI}/api/user/followings/${id.id}`,
        {
          headers: {
            jwttoken: jwt_here,
          },
        }
      );
      setFollowings(response.data);
    } catch (error) {}
  };

  const [followers,setFollowers] = useState([]);
  const getFollowers = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URI}/api/user/followers/${id.id}`,
        {
          headers: {
            jwttoken: jwt_here,
          },
        }
      );
      setFollowers(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUserDetails();
    getFollowings();
    getFollowers();
  }
  , [id]);
  const [option, setOption] = useState(0);
  const [showsidepanel, setShowsidepanel] = useState(false);

  return (
    <div className='OrganizationProfileContainer'>
    <Navbar/>
    <div className='OrganizationSubContainer'>
      <div className='OrganizationLeftContainer' onMouseOver={() => setShowsidepanel(true)} onMouseOut={() => setShowsidepanel(false)}>
        <div className='OrganizationLeftProfileContainer'>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center',padding: '5%'}}>
            <img src={(user.user.profilepicture)?user.user.profilepicture:defaultUser} className="OrganizationProfileImage" alt="" />          
            <p>{user_details.username}</p>
        </div>
        </div>
        <div className='OrganizationProfileOptionContainer'>
          <div className='OrganizationProfileOptionItem' onClick={() => setOption(0)}><FontAwesomeIcon icon={faIdCardClip} />{showsidepanel? <p>Profile</p> : ''}</div>
          <div className='OrganizationProfileOptionItem' onClick={() => setOption(1)}><FontAwesomeIcon icon={faImage} />{showsidepanel? <p>Posts</p> : ''}</div>
          <div className='OrganizationProfileOptionItem' onClick={() => setOption(2)}>Events</div>
          <div className='OrganizationProfileOptionItem' onClick={() => setOption(3)}>Members</div>
          </div>
        </div>
      <div className='OrganizationRightContainer'>
        {option === 0 && user_details && <OrganizationProfile user_details={user_details} setUser_Details={setUser_Details}/>}
        {option === 1 &&  <OrganizationProfileMainpost profileid={id.id}/>}
        {option === 2 && <div>Events</div>}
        {option === 3 && <div>Members</div>}
      </div>
    </div>
</div>
  )
}
