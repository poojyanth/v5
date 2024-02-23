import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import image3 from "../Images/image3.jpg";
import axios, { all } from "axios"
import "./stories.css"
import Storyicon from './Storyicon.js';

export default function Stories() {

    const [allfollowings, setAllfollowings] = useState();
    const userDetails = useSelector((state) => state.user);
    let user = userDetails.user;
    console.log(user);
    let id = user.user._id;

    useEffect(() => {
        const getstories = async () => {
            const ur_followings = await axios.get(`http://localhost:4000/api/user/get/followings_with_stories/${id}`);
            //axios not only returns data along with that it will return less useful things like config,ststuesText ,status etc ..
            // main content we need is present in data attribute of object
            console.log(ur_followings.data);
            setAllfollowings(ur_followings.data);
        }
        getstories();
    }, [])

    console.log(allfollowings)


    return (
            <div className="stories" style={{WebkitOverflowScrolling: 'touch',overflowY:'scroll' }}>

                {
                    allfollowings && allfollowings.map((item) => {
                         return <Storyicon details={item}/>
                    //     return <div style={{ display: 'flex', alignItems: "center" }} onClick={(e) => console.log(e)}>
                    //     <img src={`${item.others.profilepicture}`} className="StoryImage" alt="" />
                    // </div>
                    })
                }
             
            </div>
    )
}
