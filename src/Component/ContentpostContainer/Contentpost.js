import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./contentpost.css"
import image3 from "../Images/image3.jpg";
import imageIcon from "../Images/gallery.png"
import VideoIcon from "../Images/video.png"
import { useSelector}  from 'react-redux'
import {createpost} from '../../Component/ReduxContainer/apiCall';


export default function Contentpost() {

  const dispatch = useDispatch();

  const [imagePre , setImagePre] = useState(null);
  const userDetails = useSelector((state)=>state.user);

  console.log(userDetails.user.jwttoken);

  const handleinputchange = (e)=>{
    setImagePre(URL.createObjectURL(e.target.files[0]));
  }

  const handlecreatepost = async (e) => {
    e.preventDefault();
    const createpostform = document.getElementById('createpostform');
  
    const formData = new FormData(createpostform);
    formData.append('userId', userDetails.user.user._id);
    formData.append('user', userDetails.user.username);
    formData.append('desc', "This is my first post");
    formData.append('jwttoken', userDetails.user.jwttoken);
    
    try {
      const response = await createpost(dispatch, formData);
      console.log(response);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  let user = userDetails.user;

  return (
      <div className='ContentUploadContainer'>

        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
          <img src={`${user.user.profilepicture}`} className="profileimage" alt="" />
          <input type="text" className='contentWritingpart' placeholder='Write your real thought.....'  />
        </div>

        <div style={{marginLeft: '10px' }}>
          
          <form id="createpostform" onSubmit={handlecreatepost} style={{display:'flex' , justifyContent:'space-between'}}>
          
            <div>
              <img src={imagePre} style={{width:"410px" , height:'250px' , objectFit:"cover" , borderRadius:'10px'}} alt="" />
            </div>
            
            <div>
              <label htmlFor='file'>
                <img src={`${imageIcon}`} className="icons" alt="" />
                <input type="file" name="single_input" id="file" style={{display:"none"}} onChange={handleinputchange} />
              </label>
    
              <label htmlFor='file2'>
                <img src={`${VideoIcon}`} className="icons" alt="" />
                <input type="file" name="file2" id="file2" style={{display:"none"}}  />
              </label>
            </div>         
            
            <button type='submit' style={{height:"30px" ,marginRight:"12px",marginTop:"40px", paddingLeft:"20px" , paddingRight:"20px" , paddingTop:6 , paddingBottom:6 , border:"none" , backgroundColor:"black" , color:"white" , borderRadius:"5px" , cursor:"pointer"}} >Post</button>

          </form>
        </div>
      </div>
  )
}
