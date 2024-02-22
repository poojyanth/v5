import React from 'react'
import './PostPage.css'
import Navbar from '../../Component/Navbar/Navbar'
import { useSelector } from 'react-redux'
import defaultUser from "../../Component/Images/like.png"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LikeIcon from "../../Component/Images/like.png";
import CommentIcon from "../../Component/Images/speech-bubble.png";
import Share from "../../Component/Images/share.png";
import anotherlikeicon from "../../Component/Images/setLike.png"

export default function PostPage() {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails.user;
    let id = user.user._id;
    const jwt_here = user.jwttoken
    let { postid } = useParams();
    const [postData, setPost] = useState([]);
    const [postUserDetails, setPostUserDetails] = useState([]);
    const [FollowStatus, setFollowStatus] = useState("Follow");

    function handleFollowClick() {
        FollowStatus === "Follow" ? setFollowStatus("Unfollow") : setFollowStatus("Follow");
    }


    const getpost = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/post/get/PostID/${postid}`,
                {
                    headers: {
                        jwttoken: jwt_here
                    }
                }
            );
            //   console.log(response.data);
            setPost(response.data);

            console.log("Postdata", postData);


            const response2 = await axios.get(`http://localhost:4000/api/user/post/user/details/${response.data.user}`,
                {
                    headers: {
                        jwttoken: jwt_here
                    }
                }
            );
            // console.log(response2.data);
            setPostUserDetails(response2.data);
            console.log("PostUserDetails", postUserDetails);
        } catch (error) {

        }
    }

    useEffect(() => {
        getpost();
        console.log("post");
    }, [])

    if (useSelector((state) => state.user.user) === null) {
        window.location.href = "/login"
    }
    else {




        return (
            <div className='postpage'>
                <Navbar />
                <div className='postpage_container'>
                    <div className='postpage_left'>
                        <div className='imageContainer'>
                            {postData.image !== '' && <img src={postData.image} alt='post' />}
                            {(postData.video !== ''&& postData.image === '')&& <video className="PostImages" width="300" height="500" controls >
                                <source src={`${postData.video}`} type="video/mp4" />
                            </video>}
                            {((postData.image === '') && (postData.video === '')) ?
                                <div className="containerr" style={{
                                    width: "680px",
                                    height: "530px",
                                    background: "rgb(108,68,255)",
                                    background: "linear-gradient(0deg, rgba(108,68,255,1) 22%, rgba(90,97,255,1) 35%, rgba(120,64,255,1) 61%, rgba(175,45,255,1) 78%)",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    overflow: 'hidden',
                                    padding: '20px',
                                    marginLeft: '12px',
                                    fontFamily: 'Lobster, Poppins, sans-serif', // Specify the font family
                                }}>
                                    <p style={{
                                        fontSize: "30px",
                                        color: "white",
                                        textAlign: 'start',
                                        width: "100%",
                                        marginTop: 0,
                                        overflowWrap: 'break-word',
                                        wordWrap: 'break-word',
                                        whiteSpace: 'pre-line',
                                    }}>
                                        {postData.description}
                                    </p>
                                </div>


                                : <p></p>
                            }
                        </div>

                    </div>
                    <div className='postpage_right'>
                        <div className='postpage_right_container'>
                            <div className='postpage_right_top'>
                                <div className='postpage_userdetails'>
                                    <div className='postpage_userphoto'>
                                        <img src={(postUserDetails.profilepicture) ? postUserDetails.profilepicture : defaultUser} className="PostPageProfileImage" alt="" />
                                    </div>
                                    <div className='postpage_username'>
                                        <h3>{postUserDetails.username}</h3>
                                    </div>
                                    <div className='postpage_user_follow'>
                                        <button onClick={handleFollowClick}>{FollowStatus}</button>
                                    </div>
                                </div>
                                <div className='divider'></div>
                            </div>
                            <div className='postpage_right_middle'>
                                <div className='postpage_middle_description'>
                                    <p>{postData.description}</p>
                                    <div className='divider'></div>
                                </div>
                                <div className='CommentBox'>
                                    <div className='Comments'>
                                        <div className='CommentsHeading'>Comments</div>
                                        <div className='divider'></div>
                                        {/* <div className='CommentsContainer'>
                                    <div className='Comment'>
                                        <div className='CommentUser'>
                                            <img src={defaultUser} alt='user' className='postpage_userphoto'/>
                                            <p>username</p>
                                        </div>
                                        <div className='CommentDescription'>
                                            <p>comment</p>
                                        </div>
                                    </div>
                                    <div className='Comment'>
                                        <div className='CommentUser'>
                                            <img src={defaultUser} alt='user' className='postpage_userphoto'/>
                                            <p>username</p>
                                        </div>
                                        <div className='CommentDescription'>
                                            <p>comment</p>
                                        </div>
                                    </div>
                                </div> */}

                                    </div>
                                    <div className='AddComment'>
                                        <input type='text' placeholder='Add a comment' />
                                    </div>
                                </div>
                                <div className='divider'></div>
                            </div>
                            <div className='postpage_right_bottom'>
                                <img src={LikeIcon} alt='like' className='postpage_likeicon' />
                                <img src={CommentIcon} alt='comment' className='postpage_likeicon' />
                                <img src={Share} alt='share' className='postpage_likeicon' />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
