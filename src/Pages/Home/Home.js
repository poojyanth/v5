import React from 'react'
import './Home.css'
import Navbar from '../../Component/Navbar/Navbar'
import Leftbar from '../../Component/LeftsideContainer/Leftbar'
import MainPost from "../../Component/MainpostContainer/Mainpost"
import Rightbar from '../../Component/RightsideContainer/Rightbar'
import {useSelector} from 'react-redux'

export default function Home() {
  if(useSelector((state)=>state.user.user)===null){
    window.location.href="/login"
  }
  else{
  return (
    <div className='home'>
        <Navbar/>

        <div className= "ComponentContainer">
        <Leftbar/>
        <MainPost/>
        <Rightbar/>
        
        </div>
      
    </div>
  )
  }
}
