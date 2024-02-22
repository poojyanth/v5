import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import "./Signup.css"
import { useState } from 'react';
import { createuser } from '../../Component/ReduxContainer/apiCall';

export default function Login() {
  const dispatch = useDispatch();
  if(useSelector((state)=>state.user.user)){
    window.location.href="/"
  }
  const {isFetching  , error} = useSelector((state)=>state.user);
  const [email , setemail]= useState('');
  const [password , setPassword] = useState('');
  const [username , setUsername] = useState('');
  const [phonenumber , setPhonenumber] = useState('');
  const [profilepicture , setProfilepicture] = useState('');
    const handleClick = (e)=>{
    e.preventDefault();
    createuser(dispatch ,{email , password, username , phonenumber, profilepicture, Utype : 2});
    }

  return (
    <div className='mainContainerForsignup'>
      <div className='submainContainer'>
        <div style={{flex:1 , marginLeft:150  , marginBottom:"170px"}}>
          <p className='logoText'>Foto<span className='part'>flask</span></p>
          <p className='introtext'>Connect with your <span className='part'>family and friends </span></p>
        </div>

        <div style={{flex:3}}>
          <p className='createaccountTxt'>Create Account</p>

          <input type="text" name="username" id="username" placeholder='username' className='inputText' onChange={(e)=>setUsername(e.target.value)}/>
          
          <input type="email" name="email" id="email" placeholder='Email' onChange={(e)=>setemail(e.target.value)} className='inputText' />
          
          <input type="password" placeholder='******' name="password" onChange={(e)=>setPassword(e.target.value)} id="password" className='inputText' />
          
          <input type="text" placeholder='Phone Number' name="phonenumber" id="phonenumber" className='inputText' onChange={(e)=>setPhonenumber(e.target.value)} />

          <button className='btnforsignup' onClick={handleClick}>Signup</button>

          <Link to={"/login"}>
          <p style={{textAlign:'start' , marginLeft:"30.6%" }}>Already have an account?</p>
          </Link>
        </div>

      </div>
    </div>
  )
}