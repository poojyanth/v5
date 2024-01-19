import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { login } from '../../Component/ReduxContainer/apiCall';
import { createuser } from '../../Component/ReduxContainer/apiCall';
import { set } from 'mongoose';
import { useNavigate } from 'react-router-dom';

const LoginContainer = {
    height: '100vh',
    zIndex: 10,
    width: '40vw',
    display: 'flex',
    flexDirection: 'column',
    opacity: 0,
    backgroundColor: 'grey',
    position: 'absolute',
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
    color: 'white',
    fontSize: '1.5pc',
    borderRadius: '5px',
  }

const LandingLoginSignup = ({LoginContainerRef,loginSignup,setLoginSignup,setShowLoginContainer}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isFetching  , error} = useSelector((state)=>state.user);
  const [email , setemail]= useState('');
  const [password , setPassword] = useState('');

  const user = useSelector((state) => state.user?.user);

  const handleClick = async (e)=>{
    e.preventDefault();
    await login(dispatch ,{email , password});
    setShowLoginContainer(false);
    setLoginSignup(0);
    navigate('/');
  }


  const [username , setUsername] = useState('');
  const [phonenumber , setPhonenumber] = useState('');
  const [profilepicture , setProfilepicture] = useState('');

  const handleSignupClick = (e)=>{
    e.preventDefault();
    alert(email + password + username + phonenumber + profilepicture)
    createuser(dispatch ,{email , password, username , phonenumber, profilepicture});
    setShowLoginContainer(false);
    setLoginSignup(0);
    navigate('/');
  }

  const handleMouseOver = (e) => {
    e.target.style.cursor = 'pointer';
    e.target.style.background = 'white';
    e.target.style.color = 'black';
  }

  const handleMouseOut = (e) => {
    e.target.style.background = 'none';
    e.target.style.color = 'white';
  }

  return (
    <div className='LoginContainer' ref={LoginContainerRef} style={LoginContainer}>
        <div>
            <button style={loginSignupBtn} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => setShowLoginContainer(false)}>X</button>
        </div>
        {loginSignup === 0 ? 
        <>
        <h1>login</h1>
        <input type="email" name="" id="email" placeholder='Email' onChange={(e)=>setemail(e.target.value)} className='inputText' />
        <input type="password" placeholder='******' name="" onChange={(e)=>setPassword(e.target.value)} id="password" className='inputText' />
        <button className='btnforsignup' onClick={handleClick}>Login</button>
        <button onClick={() => setLoginSignup(1)}>Signup</button>

        </> : 
        <>
        <h1>signup</h1>
        <input type="text" name="username" id="username" placeholder='username' className='inputText' onChange={(e)=>setUsername(e.target.value)}/>
        <input type="email" name="email" id="email" placeholder='Email' onChange={(e)=>setemail(e.target.value)} className='inputText' />
        <input type="password" placeholder='******' name="password" onChange={(e)=>setPassword(e.target.value)} id="password" className='inputText' />
        <input type="text" placeholder='Phone Number' name="phonenumber" id="phonenumber" className='inputText' onChange={(e)=>setPhonenumber(e.target.value)} />
        <button className='btnforsignup' onClick={handleSignupClick}>Signup</button>
        <button onClick={() => setLoginSignup(0)}>Login</button>

        </>}
    </div>
  )
}

export default LandingLoginSignup