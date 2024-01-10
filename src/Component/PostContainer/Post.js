import React, { useEffect, useState } from 'react'
import image3 from "../Images/image3.jpg";
import LikeIcon from "../Images/like.png";
import CommentIcon from "../Images/speech-bubble.png";
import defaultUser from "../Images/blank-profile-picture-973460_960_720.webp"
import Share from "../Images/share.png";
import anotherlikeicon from "../Images/setLike.png"
import { useNavigate } from 'react-router-dom';
import MoreOptions from "../Images/more.png"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from "axios"
import "./post.css"

export default function Post(props) {
  const Backendport = process.env.REACT_APP_BACKEND_PORT;
  const userDetails2 = useSelector((state) => state.user);
  let user = userDetails2.user;
  const navigate = useNavigate();
  let id = user.user._id;


  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const details = await axios.get(`http://localhost:${Backendport}/api/user/post/user/details/${props.post.user}`);
        setUserDetails(details.data);
      } catch (error) {
        console.log("ERROR OCCURED IN CATCH BLOCK" + error)
      }
    }

    getuserdetails();
  }, [])

  const myUserId = userDetails2.user.user._id;

  const [Like, setLike] = useState(props.post.likes.includes(myUserId) ? anotherlikeicon : LikeIcon);
  const [count, setCount] = useState(props.post.likes.length);

  const [Comments, setComments] = useState(props.post.comments);
  const [commentwriting, setcommentwriting] = useState('');
  const [show, setshow] = useState(false);

  console.log(props.post);

  console.log(userDetails);

  const addComment = async () => {
    const comment = {
      "id": `${props.post._id}`,
      "username": `${user.user.username}`,
      "writtencomment": `${commentwriting}`
    }
    setComments(Comments.concat(comment));
  }

  const handleComment = () => {
    addComment();
    document.getElementById(props.post._id+'comment').value = '';
  }

  console.log(Comments)

  const handleshow = () => {
    if (show === false) {
      setshow(true)
    } else {
      setshow(false)
    }
  }

  const jwt_here = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTg0NGFhYTFlZjE1OGM2ZTNjNjdlZCIsInVzZXJuYW1lIjoiVVNFUjIiLCJpYXQiOjE3MDAyODU0NDZ9.Oo2Vo_M0wmya9zQaCkWnVgkoC4jFji_HqgEri_JHgQs"

  const handleLike = async () => {
    if (Like === LikeIcon) {
      await fetch(`http://localhost:${Backendport}/api/post/${props.post._id}/like`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            jwttoken: jwt_here
          }, body: JSON.stringify({ user: myUserId })
        })
        .then(response => {
          if (response.ok) {
            // Update state after successful API call
            setLike(anotherlikeicon);
            setCount(count + 1);
          } else {
            console.error('Failed to update like');
          }
        })
        .catch(error => {
          console.error('Error during like update:', error);
        });
      //  setLike(anotherlikeicon);
      //   setCount(count + 1);
    } else {
      await fetch(`http://localhost:${Backendport}/api/post/${props.post._id}/like`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            jwttoken: jwt_here
          }, body: JSON.stringify({ user: myUserId })
        })
        .then(response => {
          if (response.ok) {
            // Update state after successful API call
            setLike(LikeIcon);
            setCount(count - 1);
          } else {
            console.error('Failed to update like');
          }
        })
        .catch(error => {
          console.error('Error during like update:', error);
        });
      // setLike(LikeIcon)
      // setCount(count - 1);
    }
  }

  return (
    <div className='PostContainer'>
      <div className='SubPostContainer'>
          <div style={{    display: 'flex', alignItems : 'center',
              justifyContent: 'space-between',    flexDirection: 'row'}}>

              <Link to={`/profilepage/${userDetails._id}`} style={{textDecoration: 'none', color: 'black', fontWeight: '600'}}>
            <div style={{    display: 'flex', alignItems: 'center'}}>

              <img src={(user.user.profilepicture)?user.user.profilepicture:defaultUser} className="PostImage" alt="" />
              <div>
                <p style={{ marginLeft: '5px', textAlign: "start" }}>{userDetails.username}</p>
              </div>
            </div>
              </Link>
            {/* <div className="MoreOptions" style={{    margin: '0 5%', fontSize: 'larger', fontWeight: '900'}}>...</div> */}
            <div className="MoreOptions" style={{margin: '0 1vw', cursor: 'pointer'}}>
              {/* a button onclick navigate to postpage/id */}
              <img src={`${MoreOptions}`} className="iconsforPost" onClick={() => navigate(`/postpage/${props.post._id}`)} alt="" />

            </div>  
          </div>
          <p style={{ textAlign: 'start', width: "96%", marginLeft: 20, marginTop: 0 }}>{props.post.description}</p>
      
          {props.post.image !== '' ? 
           <img src={`${props.post.image}`} className="PostImages" alt="" />: props.post.video !== '' ? <video className="PostImages" width="500" height="500" controls >
           <source src={`${props.post.video}`} type="video/mp4"/>
          </video> : ''
          }
        {/* {  props.post.image && <img src={`${props.post.image}`} className="PostImages" alt="" />} */}
          <div style={{ display: "flex", width: "100%", justifyContent: 'space-around'}}>
            
              <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleLike}>
                <img src={`${Like}`} className="iconsforPost"  alt="" />
                <p style={{ marginLeft: "6px" }}>{count} Likes</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginLeft: 20, cursor: "pointer" }} onClick={handleshow}>
                <img src={`${CommentIcon}`}  className="iconsforPost" alt="" />
                <p style={{ marginLeft: "6px" }}>{props.post.comments.length} Comments</p>
              </div>            
              <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <img src={`${Share}`} className="iconsforPost" alt="" />
                <p style={{ marginLeft: "6px" }}>Share</p>
              </div>
          </div>
          {show === true ?
            <div style={{ padding: '10px' }}>
              <div style={{ display: "flex", alignItems: "center" }}>
              <img src={(user.user.profilepicture)?user.user.profilepicture:defaultUser} className="PostImage" alt="" />
                <input type="text" id={props.post._id+'comment'} className='commentinput' placeholder='Write your thought' onChange={(e) =>{ setcommentwriting(e.target.value);}} />
                <button className='addCommentbtn' onClick={handleComment}>Post</button>
              </div>
              {Comments.map((item) => (
                <div style={{ alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={(user.user.profilepicture)?user.user.profilepicture:defaultUser} className="PostImage" alt="" />
                    <p style={{ marginLeft: "6px", fontSize: 18, marginTop: 6 }}>{item.username}</p>
                  </div>
                  <p style={{ marginLeft: "55px", textAlign: 'start', marginTop: -16 }}>{item.writtencomment}</p>
                  <p style={{ marginLeft: "55px", textAlign: 'start', marginTop: -10, color: "#aaa", fontSize: 11 }}>Reply</p>

                </div>

              ))}
            </div> : ''
          }
      </div>
    </div>

  )
}
