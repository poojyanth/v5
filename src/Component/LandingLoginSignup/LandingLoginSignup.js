import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./LandingLoginSignup.css";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { login } from '../../Component/ReduxContainer/apiCall';
import { createuser } from '../../Component/ReduxContainer/apiCall';
import { set } from 'mongoose';
import { useNavigate } from 'react-router-dom';
import { rgb2hsl } from '@kurkle/color';
import { toast } from 'react-toastify';

const LoginContainer = {
  height: '100vh',
  zIndex: 10,
  width: '40vw',
  display: 'flex',
  borderLeft: '0.5px solid var(--tertiary-color)',
  flexDirection: 'column',
  opacity: 0,
  backgroundColor: 'var(--secondary-color)',
  position: 'fixed',
  justifyContent: 'center',
  alignItems: 'center',
  top: '0vh',
  right: '-50vw',
};

const loginSignupBtn = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: '10px',
  background: 'none',
  border: 'none',
  color: 'black',
  fontSize: '1.2pc',
  transition: 'all 0.15s ease',
  borderRadius: '5px',
}

const LandingLoginSignup = ({ LoginContainerRef, loginSignup, setLoginSignup, setShowLoginContainer }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isFetching, error } = useSelector((state) => state.user);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector((state) => state.user?.user);

  const handleClick = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      console.log(email, password);
      toast.error('Please fill all the fields');
      return;
    }

    await login(dispatch, { email, password });
    setShowLoginContainer(false);
    setLoginSignup(0);
    navigate('/');
  }


  const [username, setUsername] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [profilepicture, setProfilepicture] = useState('');

  const handleSignupClick = (e) => {
    e.preventDefault();
    if (email === '' || password === '' || username === '' || phonenumber === '' ) {
      console.log(email, password, username, phonenumber, profilepicture);
      console.log(password === '');
      toast.error('Please fill all the fields');
      return;
    }
    createuser(dispatch, { email, password, username, phonenumber, profilepicture });
    setShowLoginContainer(false);
    setLoginSignup(0);
    navigate('/');
  }

  const handleMouseOver = (e) => {
    e.target.style.cursor = 'pointer';
    e.target.style.background = 'black';
    e.target.style.color = 'white';
  }

  const handleMouseOut = (e) => {
    e.target.style.background = 'none';
    e.target.style.color = 'black';
  }

  return (
    <div className='LoginContainer' ref={LoginContainerRef} style={LoginContainer}>
      <div>
        <button style={loginSignupBtn} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => setShowLoginContainer(false)}>X</button>
      </div>
      {loginSignup === 0 ?
        <>
          <div className='login-container'>
            <h1 className='LoginSignuph1'>Login</h1>
            <input type="email" name="" id="email" placeholder='Email' onChange={(e) => setemail(e.target.value)} className='inputText' />
            <input type="password" placeholder='••••' name="" onChange={(e) => setPassword(e.target.value)} id="password" className='inputText' />
            <button className='btnforsignup' onClick={handleClick}>Login</button>
            <p>Don't have an account? <Link to="#" className='LoginSignupLink' onClick={() => setLoginSignup(1)}>Signup</Link></p>


          </div>


        </> :
        <>
          <div className='signup-container'>
            <h1 className='LoginSignuph1'>Signup</h1>
            <input type="text" name="username" id="username" placeholder='Username' className='inputText' onChange={(e) => setUsername(e.target.value)} />
            <input type="email" name="email" id="email" placeholder='Email' onChange={(e) => setemail(e.target.value)} className='inputText' />
            <input type="password" placeholder='••••' name="password" onChange={(e) => setPassword(e.target.value)} id="password" className='inputText' />
            <input type="text" placeholder='Phone Number' name="phonenumber" id="phonenumber" className='inputText' onChange={(e) => setPhonenumber(e.target.value)} />
            <button className='btnforsignup' onClick={handleSignupClick}>Signup</button>
            <span>Already have an account? <Link to="#" className='LoginSignupLink' onClick={() => setLoginSignup(0)}>Login</Link></span>

          </div>
          

        </>}
    </div>
  )
}

export default LandingLoginSignup