import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Logo from "../Images/LOGO.svg"
import { useEffect } from 'react';
import { logout } from "../ReduxContainer/UserReducer";
import ShutterPNG from "../Images/shutter.png"
import { useNavigate } from 'react-router-dom'
import { set } from 'mongoose'

const colors = {
  white: '#ffffff',
  blueWhite: 'rgb(235, 238, 242)',
  black: '#000000',
  gray: '#808080',
  grayTransparent: 'rgba(128,128,128,0.5)',
  lightgray: '#d3d3d3',
  darkgray: '#a9a9a9',
  wheat: '#f5deb3',
  lightblue: '#add8e6',
  darkblue: '#00008b',
  lightgreen: '#90ee90',
  darkgreen: '#006400',
  lightred: '#ff6347',
  darkred: '#8b0000',
  lightyellow: '#ffffe0',
  darkyellow: '#ffd700',
  lightorange: '#ffa500',
  darkorange: '#ff8c00',
}

const LogoContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
}


const fotoflask = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '1rem',
  width: '25vw',
  fontFamily: "'Montserrat Alternates', sans-serif",
  fontSize: '40px',
  fontWeight: '400',
};

const foto = {
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  height: '1rem',
  width: '25vw',
  right: '60px'
};

const flask = {
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  height: '1rem',
  width: '25vw',
  left: '48px',
};

const landingNav = {
  height: '8vh',
  width: '100vw',
  zIndex: '100',
  // backgroundColor : colors.grayTransparent,
  // borderBottom: '0.5px solid #c1c1c1',
  backgroundColor: 'var(--secondary-color)',
  display: 'flex',
  justifyContent: 'space-between',
  position: 'sticky',
  top: '0',
  alignItems: 'center',
  borderRadius: '0 0 5px 5px',
}

const loginButton = {
  borderRadius: '5px',
  backgroundColor: 'transparent',
  border: 'none',
  color: 'var(--primary-text-color)',
  fontSize: '16px',
  fontFamily: "'Montserrat Alternates', sans-serif",
  fontWeight: '400',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
}






const LandingNavbar = ({navbarlogoref,setLoginSignup,setShowLoginContainer}) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    if (user) {
      setUserLoggedIn(true);
      setUsername(user.user.username);
    }
  }, [user]);




  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Set transparency based on scroll position
      const transparency = Math.min(scrollTop /10, 0.6);

      // Apply transparency to the background color
      const updatedBackgroundColor = `rgba(235, 238, 242, ${transparency})`;

      // Update the background color
      document.querySelector('.LandingNavbar').style.backgroundColor = updatedBackgroundColor;
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleLoginMouseOver = (e) => {
    e.target.style.backgroundColor = colors.lightgray
    e.target.style.color = colors.black
  }

  const handleLoginMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent'
    e.target.style.color = colors.black
  }

  const handleLogOut = () => {
    dispatch(logout());
    setUserLoggedIn(false);

  } 


  return (
    <div className='LandingNavbar' style={landingNav}>
      <div className='LogoContainer' onClick={handleLogoClick} style={LogoContainer} ref={navbarlogoref}>
            <div className='shutterPNG' style={{width: '100%', height: '100%', display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
              <img
                src={ShutterPNG}
                alt="Shutter"
                style={{ width: '28px', height: '28px', position: 'relative', left: '-16px', top: '3px' }}
              />
            </div>
            <div className="Fotoflask" style={fotoflask}>
              <div className='Foto' style={foto}>Fot</div>
              <div className='Flask' style={flask}>Flask</div>
            </div>

      </div>
      {userLoggedIn ?
      <div className='ProfileButton' style={{margin: '0 1pc', width: '170px'}}>        
        <div className='dropdown'>
          <button className='ProfileButton' 
          style={loginButton} 
          onMouseOver={handleLoginMouseOver} 
          onMouseLeave={handleLoginMouseLeave}
          onClick={() => {navigate('/')}}
          >{username}</button> 
          <div className='dropdown-content'>            
            <Link  style={{textDecoration: 'none', color: colors.black}} onClick={handleLogOut}><p>Logout</p></Link>
          </div>
        </div>
          
      </div> :

      <div className='LoginSignupButton' style={{margin: '0 1pc', width: '170px'}}>
        <button className='LoginButton' 
        style={loginButton} 
        onMouseOver={handleLoginMouseOver} 
        onMouseLeave={handleLoginMouseLeave}
        onClick={() => {setShowLoginContainer(true); setLoginSignup(0)}}
        >Login</button> 
        <span style={{userSelect: 'none'}}>/</span>
        <button className='SignupButton' 
        style={loginButton} 
        onMouseOver={handleLoginMouseOver} 
        onMouseLeave={handleLoginMouseLeave}
        onClick={() => {setShowLoginContainer(true); setLoginSignup(1)}}
        >Signup</button>
      </div>
      }
    </div>
  )
}

export default LandingNavbar