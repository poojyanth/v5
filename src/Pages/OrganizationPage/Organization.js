import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import ProfileLeftbar from '../../Component/ProfileLeftsideContainer/ProfileLeftbar'
import ProfileRightbar from '../../Component/ProfileRightside/ProfileRightbar'
import ProfileMainPost from '../../Component/ProfileMainpostContainer/ProfileMainpost'
import "./Organization.css"
import OrganizationProfile from '../../Component/Organization/OrganizationProfile'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

export default function Organization() {

  const [option, setOption] = useState(0);

  const id = useParams(':id');
  return (
    <div className='OrganizationProfileContainer'>
    <Navbar/>
    <div className='OrganizationSubContainer'>
      <div className='OrganizationLeftContainer'>
        <div className='OrganizationProfileOptionItem'>
          <div className='OrganizationProfileOptionItem' onClick={() => setOption(0)}>Profile</div>
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
