import React, { useState, useEffect } from 'react';
 import './addnewreel.css';
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';

// for adding post
import { useSelector}  from 'react-redux'
import app from "../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Addnewreel = () => {

  const navigate = useNavigate();

  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  const jwt_here = user.jwttoken
  console.log(user);

  const [file,setFile] = useState(null);
  const [videoPre , setVideoPre] = useState(null);
  const [description,setDescription] = useState('');


  const handlepost =(e) =>{

    e.preventDefault();
    if(file !== null){
    const currentDate = new Date();
    const filename = currentDate.getTime()+file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage,filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
   (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await fetch("http://localhost:4000/api/reels/addnewreel",{method:"POST",
      headers:{
        'Content-Type':'application/JSON',
        jwttoken:jwt_here 
      },
      body:JSON.stringify({description:description,video:downloadURL})
    }).then((data)=>{

      navigate(`/`);
      alert("REEL SUCCESSFULLY UPLOADED ");

      window.location.reload(true);
    })
    });
  }
);
    }
  }




  const [videoSrc, setVideoSrc] = useState(null);
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoSrc(URL.createObjectURL(file));
    //setVideoSrc("NOT NULL")
  };

  const handleDescriptionChange = (e) => {
    document.querySelector('.description-box').innerText = e.target.value;
  };

const handleTagChange = (e) => {
    const tagValue = `#${e.target.value}`;
    const cardHolderName = document.querySelector('.card-holder-name');
    const cardHolderName1 = document.querySelector('.card-holder-name1');
  
    if (cardHolderName) {
      cardHolderName.innerText = tagValue;
    }
  
    if (cardHolderName1) {
      cardHolderName1.innerText = tagValue;
    }
  };

  useEffect(() => {
    let profilePic = document.getElementById("display-pic");
    let inputFile = document.getElementById("inputt");

    inputFile.onchange = function () {
      profilePic.src = URL.createObjectURL(inputFile.files[0]);
    };

    // document.querySelector('.card-number-input').oninput = () => {
    //  // document.querySelector('.description-box').innerText = document.querySelector('.card-number-input').value;
    // };

    document.querySelector('.cvv-input').oninput = () => {
      //document.querySelector('.card-holder-name').innerText = "#" + document.querySelector('.cvv-input').value;
      document.querySelector('.card-holder-name1').innerText = document.querySelector('.cvv-input').value;
    };

    document.querySelector('.cvv-input').onmouseenter = () => {
      document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
     document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
    };

    document.querySelector('.cvv-input').onmouseleave = () => {
      document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
      document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
    };
  }, []);

  return (
    <>
    <Navbar/>



    <div className="container_reel">



      <div className="feedcontainer">
        <div className="front">
          <div className="feed">
          
            <div className="photo">
  
 <video
 id="display-pic" 
 src="https://firebasestorage.googleapis.com/v0/b/fdfed-d64be.appspot.com/o/1703179557072VID-20211205-WA0041.mp4?alt=media&token=9ac5ea8d-6c88-47e6-87a4-4c6b06c4db3c"
 autoPlay={true}
 loop
 muted  // Add this line
 style={{
   width: '90%',
   height: '100%',
   objectFit: 'cover',
   borderRadius: '6%',
   maxHeight:'630px'
   
 }}
/>
  
</div>
<div className="head">
              <div className="profilepic3_detailsTT">
                <img className="profilepicTT" src={`${user.user.profilepicture}` }/>
                <div className="detailsTT">
                  <h5 style={{'color':'white'}}>{user.user.username}</h5>
                </div>
              </div>
            </div>
        
          </div>
        </div>
        <div className="back">
          <div className="backfeed">
            <h2 >Reel's Description </h2>
            <div className="card-holder-name1 ">.................</div>
          </div>
        </div>
      </div>




      <form method="post" action="/singlepost" encType="multipart/form-data">
      <input
  type="file"
  name="single_input"
  id="inputt"
  accept="video/*"
  className="form-control myinput"
  onChange={(e) => [setFile(e.target.files[0]), setVideoPre(URL.createObjectURL(e.target.files[0])), handleVideoChange]}
/>

        <div className="inputBox remove_phone">
          <span>User Name</span>
          <input type="text" name="cardnumber" className="" value={user.user.username} readOnly />
        </div>
        <div className="inputBox remove_phone">
          <span>Date</span>
          <input type="text" name="cardnumber" className="" value={new Date()} readOnly />
        </div>
        <label id="labell" htmlFor="inputt" className="submit-btn">
          UPLOAD VIDEO
        </label>
        {/* <div className="inputBox">
          <span>Description</span>
          <input
            type="text"
            className="card-number-input"
            name="description"
            placeholder="Enter Post Description"
         
            // onChange={handleDescriptionChange}
            required
          />
        </div> */}
        <div className="inputBox">
          <span>Enter Reel's Description</span>
          <input
            type="text"
            name="tag"
            placeholder="Enter a Tag"
            className="cvv-input"
            onChange={(e)=>[handleTagChange ,setDescription(e.target.value),handleDescriptionChange]}
            required
          />
        </div>
        <button type="submit" className="submit-btn" onClick={handlepost} >
          ADD NEW REEL
        </button>
      </form>



    </div>
    </>
  );
};

export default Addnewreel;
