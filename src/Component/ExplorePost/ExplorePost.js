import React from "react";

export default function ExplorePost({key, post}) {
    return (
        <div className="ExplorePost">
            <img src={post.image} alt="post" />
        </div>
    );
}