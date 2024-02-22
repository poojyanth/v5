import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import "./Login.css"
import { useState } from 'react';
import { login} from '../../Component/ReduxContainer/apiCall';
export default function Login() {
  const dispatch = useDispatch();
  if(useSelector((state)=>state.user.user)){
    window.location.href="/"
  }
  const {isFetching  , error} = useSelector((state)=>state.user);
  const [email , setemail]= useState('');
  const [password , setPassword] = useState('');
const handleClick = (e)=>{
  e.preventDefault();
  login(dispatch ,{email , password});
}
  return (
    <div className='mainContainerForsignup'>
      <div className='submainContainer'>
        <div style={{flex:1 , marginLeft:150  , marginBottom:"170px"}}>
          <p className='logoText'>Foto<span className='part'>flask</span></p>
          <p className='introtext'>Connect with your <span className='part'>family and friends </span></p>
        </div>
        <div style={{flex:3}}>
          <p className='createaccountTxt'>Login Account</p>
          <input type="email" name="" id="email" placeholder='Email' onChange={(e)=>setemail(e.target.value)} className='inputText' />
          <input type="password" placeholder='******' name="" onChange={(e)=>setPassword(e.target.value)} id="password" className='inputText' />
          <button className='btnforsignup' onClick={handleClick}>Login</button>

          <Link to={"/signup"} style={{textDecoration: 'none', color: 'black'}}>
          <p style={{textAlign:'start' , marginLeft:"30.6%" }}>Create New Account</p>
          </Link>
        </div>
      </div>
    </div>
  )
}