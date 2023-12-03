import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import ProfileLeftbar from '../../Component/ProfileLeftsideContainer/ProfileLeftbar'
import ProfileRightbar from '../../Component/ProfileRightside/ProfileRightbar'
import ProfileMainPost from '../../Component/ProfileMainpostContainer/ProfileMainpost'
import "./profile.css"

export default function Profile() {
  return (
    <div className='ProfileContainer'>
    <Navbar/>
    <div className='subProfileContainer'>
              <ProfileLeftbar/>
              <ProfileMainPost/>
              <ProfileRightbar/>
    </div>
</div>
  )
}
