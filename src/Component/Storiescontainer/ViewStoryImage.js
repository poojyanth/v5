import React from 'react'
import './viewstoryimage.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';


export default function ViewStoryImage() {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails.user;
    const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
    let id = user.user._id;
    const jwt_here = user.jwttoken

    let location = useLocation();
    let loc_id =location.pathname.split("/")[2];


    const [postData, setPost] = useState([]);



    useEffect(() => {
        
    const getpost = async () => {
        try {
            console.log(loc_id);
            const response = await axios.get(`${BACKEND_URI}/api/user/viewstory/${loc_id}`);
            console.log(response.data);
            setPost(response.data);
            console.log("Postdata", postData);
        } catch (error) {

        }
    }

        getpost();

    }, [])

    // if (useSelector((state) => state.user.user) === null) {
    //     window.location.href = "/login"
    // }
    // else {




        return (
            <div className='postpage1' style={{backgroundColor:"black",display:'flex',justifyContent:'space-around'}}>
             
                <div className='postpage_container'>
               
                        <div className='imageContainer'>
                            {postData.image !== '' && <img src={postData.Image} alt='post' />}
                            {(postData.video !== ''&& postData.image === '')&& <video className="PostImages" width="500" height="500" controls >
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
                         
                                    </p>
                                </div>


                                : <p></p>
                            }
                        </div>

            
                
                </div>

                <div className="containerr" style={{
  width: "480px",
  height: "max-content",
  //background: "rgb(108,68,255)",
  //background: "linear-gradient(0deg, rgba(108,68,255,1) 22%, rgba(90,97,255,1) 35%, rgba(120,64,255,1) 61%, rgba(175,45,255,1) 78%)",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  padding: '20px',
  marginLeft: '12px',
  fontFamily: 'Lora, serif', // Specify the font family
  marginTop:'70px'
}}>
    <img src='' />
  <p style={{
    fontSize: "30px",
    color: "white",
    textAlign: 'start',
    width: "100%",
    marginTop: 0,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    whiteSpace: 'pre-line',
  }}> {postData.Description}
                    </p>
                </div>

            </div>
        )
    }


