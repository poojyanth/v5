import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector}  from 'react-redux'
import defaultUser from "../Images/blank-profile-picture-973460_960_720.webp"



export default function Storyicon(props) {

  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken;


    const navigate = useNavigate();

  const navigateAndReturn = () => {
    // Navigate to the desired page
    navigate(`/viewstory/${props.details.others._id}`);

    // Set a timeout to navigate back after 4 seconds
    setTimeout(() => {
      // Navigate back to the previous page
      navigate(-1);
    }, 3000);
  };


  const addViewerToArray = async ()=>{

    await fetch(`http://localhost:4000/api/user/${props.details.others._id}/addviewer`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            jwttoken: jwt_here
          }
        })
        .then(response => {
          console.log(response)
          if (response.ok) {
           console.log("added viewer")
          } else {
            console.error('Failed to update like');
          }
        })
        .catch(error => {
          console.error('Error during adding viewer to story:', error);
        });
  }


    console.log(props.details)
    return (
        <div>
            <div style={{ display: 'flex', alignItems: "center" }} onClick={()=>{navigateAndReturn();addViewerToArray()}}>
                <img src={(props.details.others.profilepicture)? props.details.others.profilepicture : defaultUser } className="StoryImage" alt="" />
            </div>
        </div>
    )
}
