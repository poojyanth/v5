import React, { useState } from 'react'
import "./contentpost.css"
import { toast, ToastContainer } from 'react-toastify';
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
  const Backendport = process.env.REACT_APP_BACKEND_PORT;
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  const navigate = useNavigate();
  console.log(user);
  const [file,setFile] = useState(null);
  const [file2,setFile2] = useState(null);
  const jwt_here = user.jwttoken;
  console.log("JWT TOKEN HEREEEE"+jwt_here)
  const [description,setDescription] = useState(' ' );

  const notifySuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000, // Close the toast after 3 seconds
      style: {
        fontSize: '14px', // Adjust font size
        width: '250px' // Adjust width
      }
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000, // Close the toast after 3 seconds
      style: {
        fontSize: '14px', // Adjust font size
        width: '250px' // Adjust width
      }
    });
  };

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
    }
  }, 
  (error) => {
    notifyError(error.message); // Notify error using toast
  },  
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await fetch(`http://localhost:${Backendport}/api/post/createpost`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON',
          jwttoken: jwt_here
        },
        body: JSON.stringify({ description: description, image: downloadURL, video: '' })
      }).then((data) => {
        notifySuccess("IMAGE POST - SUCCESSFULLY UPLOADED"); // Notify success using toast
        reloadMainpost();

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
      }
    }, 
    (error) => {
      console.log(error);
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        await fetch(`http://localhost:${Backendport}/api/post/createpost`,{method:"POST",
        headers:{
          'Content-Type':'application/json',
          jwttoken:jwt_here 
        },
        body:JSON.stringify({description:description,image:'',video:downloadURL})
      }).then((data)=>{
        notifySuccess("VIDEO POST - SUCCESSFULLY UPLOADED"); // Notify success using toast
        window.location.reload(true);
      })
      });
    }
  );

    }else {
      fetch(`http://localhost:${Backendport}/api/post/createpost`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          jwttoken: jwt_here
        },
        body: JSON.stringify({ description: description, image: "", video: "" })
      }).then((data) => {
        notifySuccess("TEXT POST - SUCCESSFULLY UPLOADED"); // Notify success using toast
        window.location.reload(true);
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
          <img src={(user.user.profilepicture)?user.user.profilepicture:defaultUser} className="profileimage" alt="" /> 
          <input type="text" className='contentWritingpart' placeholder='Write your real thought.....' onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <div style={{marginLeft: '10px' }}>
          {/* {imagePre !== null ? <img src={`${image3}`} style={{width:"410px" , height:'250px' , objectFit:"cover" , borderRadius:'10px'}} alt="" /> : VideoPre !== null ? <video className="PostImages" width="500" height="500" controls >
           <source src={VideoPre} type="video/mp4"/>
          </video> : ''
          } */}
          <div style={{display:'flex' , justifyContent:'space-between'}}>
          <div>
            <label htmlFor='file'>
              <img src={`${imageIcon}`} className="icons" alt="" />
              <input type="file" name="file" id="file" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} />
            </label>
  
            <label htmlFor='file2'>
              <img src={`${VideoIcon}`} className="icons" alt="" />
              <input type="file" name="file2" id="file2" style={{display:"none"}} onChange={(e)=>setFile2(e.target.files[0])}  />
            </label>
          </div>         
            <button style={{height:"30px" ,marginRight:"12px",marginTop:"40px", paddingLeft:"20px" , paddingRight:"20px" , paddingTop:6 , paddingBottom:6 , border:"none" , backgroundColor:"black" , color:"white" , borderRadius:"5px" , cursor:"pointer"}} onClick={handlepost} >Post</button>
          </div>
        </div>
      </div>
  )
}
