import React from "react";
import "./SearchPage.css";
import Navbar from "../../Component/Navbar/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ExplorePost from "../../Component/ExplorePost/ExplorePost";
import { useParams } from "react-router-dom";

export default function SearchPage() {
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

  const key = useParams(":key").key;
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user.user._id;
  const jwt_here = user.jwttoken;
  const [searchPosts, setsearchPosts] = useState([]);

  const getsearchPosts = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URI}/api/post/get/${encodeURIComponent(key)}`,
        {
          headers: {
            jwttoken: jwt_here,
          },
        }
      );
      setsearchPosts(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getsearchPosts();

  }, [key]);

  return (
    <div className="Explorepage">
      <Navbar />
      <div className="ExploreComponentContainer">
        <div className="ExplorepageHeader">
          <h1>Search Results for "{key}"</h1>
        </div>
        <div className="ExplorePostContainer">
          {searchPosts.post?.map((post) =>
            post.image ? <ExplorePost post={post} key={post._id} /> : ""
          )}
        </div>
      </div>
    </div>
  );
}
