import React from 'react'
import { useNavigate } from 'react-router-dom';



export default function Storyicon(props) {


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

    console.log(props.details)
    return (
        <div>
            <div style={{ display: 'flex', alignItems: "center" }} onClick={navigateAndReturn}>
                <img src={`${props.details.others.profilepicture}`} className="StoryImage" alt="" />
            </div>
        </div>
    )
}
