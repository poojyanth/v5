import React, { useState, useEffect } from 'react';
 import './addnewpost.css';
import wicket from "../../Component/Images/wicket.jpg";
import Navbar from '../../Component/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

// for adding post
import { useSelector}  from 'react-redux'
import app from "../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';

const AddNewPost = () => {

  const navigate = useNavigate();
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  const jwt_here = user.jwttoken
  console.log(user);

  const [file,setFile] = useState(null);
  const [imagePre , setImagePre] = useState(null);
  const [description,setDescription] = useState('');


  const handlepost =(e) =>{

    e.preventDefault();
    if(file !== null){
    const currentDate = new Date();
    const filename = currentDate.getTime()+file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage,filename);

    const uploadTask = uploadBytesResumable(storageRef, file);

    toast.info('Uploading Post ');
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
      await fetch(`${BACKEND_URI}/api/post/createpost`,{method:"POST",
      headers:{
        'Content-Type':'application/JSON',
        jwttoken:jwt_here 
      },
      body:JSON.stringify({description:description,image:downloadURL,video:''})
    }).then((data)=>{

      navigate(`/`);
      toast.success('Post Added Successfully');

      window.location.reload(true);
    })
    });
  }
);
    }
  }




  const [imageSrc, setImageSrc] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageSrc(URL.createObjectURL(file));
  };

  const handleDescriptionChange = (e) => {
    document.querySelector('.description-box').innerText = e.target.value;
  };

  const handleTagChange = (e) => {
    const tagValue = `#${e.target.value}`;
    document.querySelector('.card-holder-name').innerText = tagValue;
    document.querySelector('.card-holder-name1R').innerText = tagValue;
  };

  useEffect(() => {
    let profilePic = document.getElementById("display-picR");
    let inputFile = document.getElementById("inputt");

    inputFile.onchange = function () {
      profilePic.src = URL.createObjectURL(inputFile.files[0]);
    };

    document.querySelector('.card-number-input').oninput = () => {
      document.querySelector('.description-box').innerText = document.querySelector('.card-number-input').value;
    };

    document.querySelector('.cvv-input').oninput = () => {
      document.querySelector('.card-holder-name').innerText = "#" + document.querySelector('.cvv-input').value;
      document.querySelector('.card-holder-name1R').innerText = "#" + document.querySelector('.cvv-input').value;
    };

    document.querySelector('.cvv-input').onmouseenter = () => {
      document.querySelector('.frontR').style.transform = 'perspective(1000px) rotateY(-180deg)';
      document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
    };

    document.querySelector('.cvv-input').onmouseleave = () => {
      document.querySelector('.frontR').style.transform = 'perspective(1000px) rotateY(0deg)';
      document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
    };
  }, []);

  return (
    <>
 
    <Navbar/>
 
   
    <div className="containerR">
      <div className="feedcontainerR">
        <div className="frontR">
          <div className="feedR">
            <div className="headR" style={{marginBottom:'-9px'}}>
              <div className="profilepic3_details">
                <img className="profilepicR" src={`${user.user.profilepicture}` }/>
                <div className="detailsR">
                  <h5 style={{marginTop:'16px',fontSize:'16px',marginLeft:'-21px'}}>{user.user.username}</h5>
                </div>
              </div>
              <div className="trpiledots">
                <span>
                  <i className="bi bi-three-dots"></i>
                </span>
              </div>
            </div>
            <div className="photoR">
              <img id="display-picR" src={imageSrc || `${wicket}`} />
            </div>
            <div className="icons">
              <div className="mainicons">
                <span>
                  <i className="bi bi-heart"></i>
                </span>
                <span>
                  <i className="bi bi-chat-dots"></i>
                </span>
                <span>
                  <i className="bi bi-share"></i>
                </span>
              </div>
     
            </div>
            <div className="caption">
              <p>
              <div className="description-box" style={{wordWrap:'break-word'}}>################</div>
              </p>
              <h5>TAGS :</h5> <div className="card-holder-name">.................</div>
            </div>
          </div>
        </div>
        <div className="back">
          <div className="backfeedR">
            <div className="card-holder-name1R ">.................</div>
            <h1>FOTO FLASK</h1>
            <h3>.............NEW POST LOADING..........</h3>
          </div>
        </div>
      </div>
      <form method="post" action="/singlepost" encType="multipart/form-data">
        <input
          type="file"
          name="single_input"
          id="inputt"
          accept="image/jpeg, image/png, image/jpg"
          className="form-control myinput"
          // onChange={handleImageChange}
          onChange={(e)=>[setFile(e.target.files[0]) , setImagePre(URL.createObjectURL(e.target.files[0])),handleImageChange]}

        />
        <div className="inputBox remove_phone">
          <span>User Name</span>
          <input type="text" name="cardnumber" className="" value="SAIPAVAN" readOnly />
        </div>
        <div className="inputBox remove_phone">
          <span>Date</span>
          <input type="text" name="cardnumber" className="" value="05-01-2024" readOnly />
        </div>
        <label id="labell" htmlFor="inputt" className="submit-btn">
          UPLOAD PHOTO
        </label>
        <div className="inputBox">
          <span>Description</span>
          <input
            type="text"
            className="card-number-input"
            name="description"
            placeholder="Enter Post Description"
            onChange={(e)=>[setDescription(e.target.value),handleDescriptionChange]}
            // onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="inputBox">
          <span>Tag</span>
          <input
            type="text"
            name="tag"
            placeholder="Enter a Tag"
            className="cvv-input"
            onChange={handleTagChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn" onClick={handlepost} >
          ADD NEW POST
        </button>
      </form>
    </div>
    </>
  );
};

export default AddNewPost;
