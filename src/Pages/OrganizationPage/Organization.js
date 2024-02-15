import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import ProfileLeftbar from '../../Component/ProfileLeftsideContainer/ProfileLeftbar'
import ProfileRightbar from '../../Component/ProfileRightside/ProfileRightbar'
import ProfileMainPost from '../../Component/ProfileMainpostContainer/ProfileMainpost'
import "./Organization.css"
import { useParams } from 'react-router-dom'

export default function Organization() {
  const id = useParams(':id');
  return (
    <div className='OrganizationProfileContainer'>
    <Navbar/>
    <div className='OrganizationSubContainer'>
      <div className='OrganizationLeftContainer'>
        </div>
      <div className='OrganizationRightContainer'>
      </div>
    </div>
</div>
  )
}
