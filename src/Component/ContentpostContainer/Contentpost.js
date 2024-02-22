import React, { useState } from 'react'
import "./contentpost.css"
import { toast, ToastContainer } from 'react-toastify';
import {notifySuccess, notifyError, notifyUploading} from "../ToastNotification/Toast.js"
import 'react-toastify/dist/ReactToastify.css';
import imageIcon from "../Images/gallery.png"
import VideoIcon from "../Images/video.png"
import defaultUser from "../Images/blank-profile-picture-973460_960_720.webp"
import { useSelector}  from 'react-redux'
import app from "../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import Mainpost from '../MainpostContainer/Mainpost';



export default function Contentpost({ reloadMainpost }) {
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  const navigate = useNavigate();
  console.log(user);

  const [file,setFile] = useState(null);
  const [file2,setFile2] = useState(null);
  const [file3,setFile3] = useState(null);

  const jwt_here = user.jwttoken;
  console.log("JWT TOKEN HEREEEE"+jwt_here)
  const [description,setDescription] = useState(' ' );



  const [imagePreview, setImagePreview] = useState(null); // State to hold image preview URL

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Set the file in state

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile); // Create preview URL
      setImagePreview(imageUrl); // Set the preview URL in state
    }
  };

  const [videoPreview, setVideoPreview] = useState(null); // State to hold video preview URL
  const [StoryPre , setStoryPre] = useState(null);

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setFile2(selectedVideo); // Set the video file in state

    if (selectedVideo) {
      const videoUrl = URL.createObjectURL(selectedVideo); // Create preview URL
      setVideoPreview(videoUrl); // Set the preview URL in state
    }
  };

  const handlepost =(e) =>{

    e.preventDefault();
    if(file !== null){
    const currentDate = new Date();
    const filename = currentDate.getTime()+file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage,filename);

    const uploadTask = uploadBytesResumable(storageRef, file);
    notifyUploading("UPLOADING"); // Notify uploading using toast
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
        console.log("DEFAULT");

    }
  }, 
  (error) => {
    notifyError(error.message); // Notify error using toast
  },  
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await fetch(`${BACKEND_URI}/api/post/createpost`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON',
          jwttoken: jwt_here
        },
        body: JSON.stringify({ description: description, image: downloadURL, video: '' })
      }).then((data) => {
        notifySuccess("IMAGE POST - SUCCESSFULLY UPLOADED"); // Notify success using toast
        reloadMainpost();
        setImagePreview(null); // Clear image preview
        setVideoPreview(null); // Clear video preview
        setDescription(' '); // Clear description
        document.getElementsByName('Inputdescription').value = '';
      }).catch((error) => {
        notifyError("Failed to upload image post"); // Notify error using toast
      });
    });
  }
);
    }else if(file2!==null){


      const currentDate = new Date();
      const filename = currentDate.getTime()+file2.name;
      const storage = getStorage(app);
      const storageRef = ref(storage,filename);
  
      const uploadTask = uploadBytesResumable(storageRef, file2);
      notifyUploading("UPLOADING"); // Notify uploading using toast
  
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
          console.log("DEFAULT");
      }
    }, 
    (error) => {
      console.log(error);
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        await fetch(`${BACKEND_URI}/api/post/createpost`,{method:"POST",
        headers:{
          'Content-Type':'application/json',
          jwttoken:jwt_here 
        },
        body:JSON.stringify({description:description,image:'',video:downloadURL})
      }).then((data)=>{
        notifySuccess("VIDEO POST - SUCCESSFULLY UPLOADED"); // Notify success using toast
        reloadMainpost();
        setImagePreview(null); // Clear image preview
        setVideoPreview(null); // Clear video preview
        setDescription(' '); // Clear description
        document.getElementsByName('Inputdescription').value = '';
      })
      });
    }
  );

    }
    else if(file3!==null){

      const currentDate = new Date();
      const filename = currentDate.getTime()+file3.name;
      const storage = getStorage(app);
      const storageRef = ref(storage,filename);
  
      const uploadTask = uploadBytesResumable(storageRef, file3);
  
      uploadTask.on('state_changed', 
    (snapshot) => {
    
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
  
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        await fetch("http://localhost:4000/api/user/add/story",{method:"POST",
        headers:{
          'Content-Type':'application/json',
          jwttoken:jwt_here 
        },
        body:JSON.stringify({ newstory:downloadURL,description:'"'+description+'"'})
      }).then((data)=>{
        alert("YOUR STORY ADDED SUCCESSFULLY ");
        window .location.reload(true);
      })
      });
    }
  );


    }else {
      fetch(`${BACKEND_URI}/api/post/createpost`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          jwttoken: jwt_here
        },
        body: JSON.stringify({ description: description, image: "", video: "" })
      }).then((data) => {
        notifySuccess("TEXT POST - SUCCESSFULLY UPLOADED"); // Notify success using toast
        reloadMainpost();
        setImagePreview(null); // Clear image preview
        setVideoPreview(null); // Clear video preview
        setDescription(' '); // Clear description
        document.getElementsByName('Inputdescription').value = '';
      }).catch((error) => {
        notifyError("Failed to upload text post"); // Notify error using toast
      });
    }
  }

  // console.log(file.name);

  // console.log(file2.name);


  return (
    <div className='ContentUploadContainer'>
      <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
        <img src={(user.user.profilepicture) ? user.user.profilepicture : defaultUser} className="profileimage" alt="" />
        <input type="text" name='Inputdescription' className='contentWritingpart' placeholder='Write your real thought.....' onChange={(e) => setDescription(e.target.value)} />
      </div>
     
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
          {/* Display image preview if available */}
        {imagePreview && <img src={imagePreview} style={{ objectFit: 'cover', padding: '6px', borderRadius: '10px' }} alt="Preview" />}
        {/* Display video preview if available */}
        {videoPreview && <video width="410" height="auto" style={{ marginTop: '20px' }}>
          <source src={videoPreview} type="video/mp4" />
          Your browser does not support the video tag.
        </video>}
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0 5px 5px'}}>
            <div style={{marginTop:'10px',marginLeft:'14px'}}>
              <label htmlFor='file'>
                <img src={`${imageIcon}`} className="icons" alt="" />
                <input type="file" name="file" id="file" style={{ display: "none" }} onChange={handleImageChange} />
              </label>

              <label htmlFor='file2'>
                <img src={`${VideoIcon}`} className="icons" alt="" />
                <input type="file" name="file2" id="file2" style={{ display: "none" }} onChange={(e) => setFile2(e.target.files[0])} />
              </label>

              <label htmlFor='file3'>
              <img src={`${imageIcon}`} className="icons" alt="" />
              <input type="file" name="file3" id="file3" style={{display:"none"}} onChange={(e)=>[setFile3(e.target.files[0]) , setStoryPre(URL.createObjectURL(e.target.files[0]))]} />
            </label>
            </div>
            <button style={{ height: "30px", paddingLeft: "20px", paddingRight: "20px", paddingTop: 6, paddingBottom: 6, border: "none", backgroundColor: "black", color: "white", borderRadius: "5px", cursor: "pointer" }} onClick={handlepost}>Post</button>
          </div>
          
        
      </div>
    </div>
  );
}
