import React from 'react'
import Logo from "../Images/LOGO.svg"
import { useNavigate } from 'react-router-dom'

const LandingNavbar = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <div className='LandingNavbar'>
      <div className='LogoContainer' onClick={handleLogoClick}>
        <img src={Logo} className='Logo' height='30rem' alt="" />

      </div>
    </div>
  )
}

export default LandingNavbar