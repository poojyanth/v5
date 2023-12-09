import React from 'react'
import './Explorepage.css'
import Navbar from '../../Component/Navbar/Navbar'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import ExplorePost from '../../Component/ExplorePost/ExplorePost'

export default function Explorepage() {

    const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken
  const [exploreposts,setExplorePosts] = useState([]);
  
    const getExplorePosts = async()=>{
        try{
          const response = await axios.get(`http://localhost:5000/api/post/get/allpost`,{
            headers:{
              jwttoken:jwt_here // must be the attribute name (same name as in headers )-> i.e jwttoken
            }
          });
          setExplorePosts(response.data);  // include particularly .followingPosts 
                                                      //otherwise it returns an data object
      }catch(error){
    
      }
      }

        useEffect(()=>{
            getExplorePosts();
            console.log(exploreposts);
        },[])

  return (
    <div className='Explorepage'>
        <Navbar/>      
        <div className= "ComponentContainer">
        {/* {
          exploreposts.map((item)=>{
            return <ExplorePost  key={item.id}  post={item}/>
          })
        } */}
        </div>

    </div>
  )
}
