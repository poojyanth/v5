import React,{useEffect, useState} from 'react'
import image3 from "../Images/image3.jpg";
import LikeIcon from "../Images/like.png";
import CommentIcon from "../Images/speech-bubble.png";
import Share from "../Images/share.png";
import anotherlikeicon from "../Images/setLike.png"
import MoreOptions from "../Images/more.png"
import axios from "axios"
import "./post.css"

export default function Post(props) {

  const[userDetails,setUserDetails] = useState([]);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

  useEffect(()=>{
    const getuserdetails =async()=>{
      try{
      const details = await axios.get(`${BACKEND_URI}/api/user/post/user/details/${props.post.user}`);
      setUserDetails(details.data);
      }catch(error){
        console.log("ERROR OCCURED IN CATCH BLOCK"+error)
      }
    }

    getuserdetails();
  },[])

  const myUserId="656762a5c43095cb8ad3dc3c";

  const [Like, setLike] = useState(props.post.likes.includes(myUserId)?anotherlikeicon:LikeIcon);
  const [count, setCount] = useState(props.post.likes.length);

  const [Comments, setComments] = useState([]);
  const [commentwriting, setcommentwriting] = useState('');
  const [show, setshow] = useState(false);

  console.log(props.post);


    




  console.log(userDetails);

  const addComment = async() => {
    const comment = {
      "id": `123456789`,
      "username": `MS DHONI`,
      "writtencomment":`${commentwriting}`
    }
    setComments(Comments.concat(comment));
  }

  const handleComment = () => {
    addComment();
  }

  console.log(Comments)

const handleshow = ()=>{
  if(show === false){
    setshow(true)
  }else{
    setshow(false)
  }
}

const jwt_here="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTg0NGFhYTFlZjE1OGM2ZTNjNjdlZCIsInVzZXJuYW1lIjoiVVNFUjIiLCJpYXQiOjE3MDAyODU0NDZ9.Oo2Vo_M0wmya9zQaCkWnVgkoC4jFji_HqgEri_JHgQs"

  const handleLike = async() => {
    if (Like === LikeIcon) {
      await fetch(`${BACKEND_URI}/api/post/${props.post._id}/like`,
      {method:"PUT" ,
      headers:{
        'Content-Type':'application/json',
        jwttoken:jwt_here
      }, body: JSON.stringify({ user: myUserId})})
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
      await fetch(`${BACKEND_URI}/api/post/${props.post._id}/like`,
      {method:"PUT" ,
      headers:{
        'Content-Type':'application/json',
        jwttoken:jwt_here
      }, body: JSON.stringify({ user: myUserId })})   
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
        <div>
          <div style={{ display: 'flex', alignItems: "center" }}>
       <img src={`${userDetails.profilepicture}`} className="PostImage" alt="" /> 
            
            <div>
              <p style={{ marginLeft: '5px', textAlign: "start" }}>{userDetails.username}</p>
              <p style={{ fontSize: "11px", textAlign: "start", marginLeft: 5, marginTop: -13, color: "var(--secondary-text-color)" }}>Following by suman</p>
            </div>
            <img src={`${MoreOptions}`} style={{marginRight:16}}className="moreicons" alt="" />
          </div>
          <p style={{ textAlign: 'start', width: "96%", marginLeft: 20, marginTop: 0 }}>{props.post.description}</p>
          {/* {post.image !== '' ? 
           <img src={`${post.image}`} className="PostImages" alt="" />: post.video !== '' ? <video className="PostImages" width="500" height="500" controls >
           <source src={`${post.video}`} type="video/mp4"/>
          </video> : ''
          } */}
          <img src={`${props.post.image}`} className="PostImages" alt="" />
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", marginLeft: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <img src={`${Like}`} className="iconsforPost" onClick={handleLike} alt="" />
                <p style={{ marginLeft: "6px" }}>{count} Likes</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginLeft: 20, cursor: "pointer" }}>
                <img src={`${CommentIcon}`} onClick={handleshow} className="iconsforPost"  alt="" />
                <p style={{ marginLeft: "6px" }}>{props.post.comments.length} Comments</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginLeft: 200, cursor: "pointer" }}>
              <img src={`${Share}`} className="iconsforPost" alt="" />
              <p style={{ marginLeft: "6px" }}>Share</p>
            </div>
          </div>
          {show === true ?
          <div style={{padding:'10px'}}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={`${image3}`} className="PostImage" alt="" />
              <input type="text" className='commentinput' placeholder='Write your thought' onChange={(e) => setcommentwriting(e.target.value)} />
              <button className='addCommentbtn' onClick={handleComment}>Post</button>
            </div>
            {Comments.map((item) => (
              <div style={{ alignItems: "center" }}>
                <div style={{display:"flex" , alignItems:"center"}}> 
                {item.profile === '' ? 
                  <img src={`${image3}`} className="PostImage" alt="" /> : <img src={`${image3}`} className="PostImage" alt="" />
                }
                  <p style={{ marginLeft: "6px" , fontSize:18, marginTop:6 }}>{item.username}</p>
                </div>
                <p style={{ marginLeft: "55px" , textAlign:'start' , marginTop:-16 }}>{item.writtencomment}</p>
                <p style={{ marginLeft: "55px" , textAlign:'start' , marginTop:-10 , color:"var(--secondary-text-color)" , fontSize:11}}>Reply</p>
                
              </div>

            ))}
          </div>:''
           }
        </div>
        </div>
      </div>
   
  )
}
