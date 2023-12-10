import React from "react";
import "./ExplorePost.css";
import { Link } from "react-router-dom";

export default function ExplorePost({key, post}) {
    return (
        <Link to={`/postpage/${post._id}`} className="ExplorePostLink">
        <div className="ExplorePost">
            <img src={post.image} alt="post" className="ExplorePostImage" />
        </div>
        </Link>
    );
}