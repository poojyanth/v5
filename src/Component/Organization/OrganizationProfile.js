import React from 'react'
import { useParams } from 'react-router-dom'

const OrganizationProfile = () => {
    const id = useParams(':id');
  return (
    <div className='OrganizationSubProfileContainer'>
        <div className='OrganizationProfileCover'>
            
        </div>
    </div>
  )
}

export default OrganizationProfile