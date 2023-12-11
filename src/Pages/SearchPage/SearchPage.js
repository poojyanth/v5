import React from 'react'
import './SearchPage.css'
import Navbar from '../../Component/Navbar/Navbar'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import ExplorePost from '../../Component/ExplorePost/ExplorePost'
import { useParams } from 'react-router-dom'

export default function SearchPage() {

  const Backendport = process.env.REACT_APP_BACKEND_PORT;

  const {key} = useParams('/:key');

    const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken
  const [searchPosts,setsearchPosts] = useState([]);
  
    const getsearchPosts = async()=>{
        try{
          const response = await axios.get(`http://localhost:${Backendport}/api/post/get/${encodeURIComponent(key)}`,{
            headers:{
              jwttoken:jwt_here // must be the attribute name (same name as in headers )-> i.e jwttoken
            }
          });
          setsearchPosts(response.data);  // include particularly .followingPosts 
                                                      //otherwise it returns an data object
      }catch(error){
    
      }
      }

        useEffect(()=>{
            getsearchPosts();
            console.log(searchPosts.posts);
        },[key])

  return (
    <div className='Explorepage'>
        <Navbar/>      
        <div className= "ExploreComponentContainer">
            <div className="ExplorepageHeader">
                <p>Explore</p>
            </div>
            <div className="ExplorePostContainer">
                {searchPosts.posts?.map((post)=>(
                    post.image? <ExplorePost post={post} key={post._id}/>: '' 
                ))}
            </div>
        </div>

    </div>
  )
}
