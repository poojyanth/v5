import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import ProfileLeftbar from '../../Component/ProfileLeftsideContainer/ProfileLeftbar'
import ProfileRightbar from '../../Component/ProfileRightside/ProfileRightbar'
import ProfileMainPost from '../../Component/ProfileMainpostContainer/ProfileMainpost'
import "./profile.css"
import { useParams } from 'react-router-dom'

export default function Profile() {
  const id = useParams(':id');
  console.log("Profilepage"+id.id);

  return (
    <div className='ProfileContainer'>
    <Navbar/>
    <div className='subProfileContainer'>
              <ProfileLeftbar profileid={id.id}/>
              <ProfileMainPost profileid={id.id}/>
              <ProfileRightbar profileid={id.id}/>
    </div>
</div>
  )
}
