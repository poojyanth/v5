import React, { useEffect, useState } from "react";
import "./rightbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ad from "../Images/ads.jpg";
import axios from "axios";
import Follow from "./Follow";

export default function Rightbar() {
  const userDetails = useSelector((state) => state.user);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  let user = userDetails.user;
  let id = user.user._id;
  const jwt_here = user.jwttoken;

  const [suggestions, setSuggestions] = useState([]);

  const [ads, setAds] = useState([]);

  const getAds = async () => {
    try {
      const response = await axios.get(`${BACKEND_URI}/api/organisation/get/ads`, {
        headers: {
          jwttoken: jwt_here,
        },
      });
      setAds(response.data);
    } catch (error) {
      console.log("ERROR OCCURRED IN CATCH BLOCK:", error);
    }
  }

  useEffect(() => {
    const getsuggestions = async () => {
      try {
        const details = await axios.get(
          `${BACKEND_URI}/api/user/all/user/${id}`,
          {
            headers: {
              jwttoken: jwt_here,
            },
          }
        );
        setSuggestions(details.data);
      } catch (error) {
        console.log("ERROR OCCURED IN CATCH BLOCK" + error);
      }
    };

    const getAds = async () => {
      try {
        const response = await axios.get(`${BACKEND_URI}/api/organisation/get/ads`, {
          headers: {
            jwttoken: jwt_here,
          },
        });
        setAds(response.data);
      } catch (error) {
        console.log("ERROR OCCURRED IN CATCH BLOCK:", error);
      }
    }

    getsuggestions();
    getAds();
    console.log(ads);
  }, []);


  return (
    <div className="rightbar">
      <div className="rightcontainer">
        <h3 style={{ textAlign: "start", marginLeft: "10px" }}>Ads</h3>
      <div className="adsContainer">
        {ads.randomPosts && ads.randomPosts.map((post, index) => (
          <div key={index} className="ad">
            <Link to={`/postpage/${post._id}`} style={{ textDecoration: "none", color: 'black', display: 'flex', flexDirection: 'row'}}>
            {/* Render ad image */}
            <img src={post?.image? post.image: ad} className="adsimg" alt="ad" />
            <div className="adText">
              <p>{post.title}</p>
              <p>{post.description}</p>
            </div>
            </Link>
          </div>
        ))}
      </div>

      </div>
  
      <div className="rightcontainer">
        <h3 style={{ textAlign: "start", marginLeft: "10px" }}>
          Suggested for you
        </h3>
  
        {suggestions.map((item) => {
          return <Follow key={item._id} user_details={item} />;
        })}
      </div>
    </div>
  );
  
}
