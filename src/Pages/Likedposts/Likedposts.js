import React from 'react'
// import './Likedposts.css'
import Navbar from '../../Component/Navbar/Navbar'
import Leftbar from '../../Component/LeftsideContainer/Leftbar'
import LikedPosts from "../../Component/Likedposts/Likedposts"
import Rightbar from '../../Component/RightsideContainer/Rightbar'
export default function LikedPostspage() {
  return (
    <div className='home'>
        <Navbar/>

        <div className= "ComponentContainer">
        <Leftbar/>
        <LikedPosts/>
        <Rightbar/>
        
        </div>
      
    </div>
  )
}
