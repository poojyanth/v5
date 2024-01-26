import React, { useEffect, useState } from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import axios from 'axios';
import './Admin.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AllStats from '../../Component/Admin/AllStats';
import UserStats from '../../Component/Admin/UserStats';
import PostStats from '../../Component/Admin/PostStats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlackTie } from '@fortawesome/free-brands-svg-icons';            
import { faSolarPanel,faImages, faUsers, faChartSimple } from '@fortawesome/free-solid-svg-icons';

const AdminSideBarOption = {height: '4pc', cursor: 'pointer', alignItems: 'center', display: 'flex', justifyContent: 'space-around', flexDirection: 'row'};

const AdminPage = () => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalPosts, setTotalPosts] = useState([]);
  const [totalTraffic, setTotalTraffic] = useState([]);
  const [totalTrafficNumber, setTotalTrafficNumber] = useState(0);
  const [showsideBar, setShowsideBar] = useState(false);
  
  const category = useParams(':category').category;
  const [adminContent, setAdminContent] = useState(category? category: 'DashBoard');

  const adminContentOptions = [
    {
      name: 'DashBoard'
    },
    {
      name: 'Users'
    },
    {
      name: 'Posts'
    },
    {
      name: 'Analytics'
    }
  ]


  const navigate = useNavigate();
  const userDetails = useSelector((state)=>state.user);
  const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken

  const getUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URI}/api/user/get/allusers`,{
        headers:{
          jwttoken: jwt_here
        }
      });
      setTotalUsers(response.data.allUsersList); // Assuming the response contains an 'allUsersList' field
    } catch (error) {
      console.log("ERROR OCCURRED IN CATCH BLOCK:", error);
    }
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URI}/api/post/get/allposts`,{
        headers:{
          jwttoken: jwt_here
        }
      });
      setTotalPosts(response.data.post); // Assuming the response contains an 'allPostsList' field
    } catch (error) {
      console.log("ERROR OCCURRED IN CATCH BLOCK:", error);
    }
  };

  const getTraffic = async () => {
    try {
      const response = await axios.get(`${BACKEND_URI}/api/admin/log`,{
        headers:{
          jwttoken: jwt_here
        }
      });
      setTotalTrafficNumber(response.data.numberOfRequests);
      setTotalTraffic(response.data.logData); // Assuming the response contains an 'allPostsList' field
      // setTotalTraffic(response.data.logData); // Assuming the response contains an 'allPostsList' field
    }
    catch (error) {
      console.log("ERROR OCCURRED IN CATCH BLOCK:", error);
    }
  };
      

  useEffect(() => {
    getUsers();
    getPosts();
    getTraffic();
  }, []);

  useEffect(() => {
    const categoryIndex = adminContentOptions.findIndex(
      (category) => category.name === category
    );
    if (categoryIndex !== -1) {
      setAdminContent(categoryIndex);
    }
  }, [category]);


  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    // Calculate total likes and comments
    let likesCount = 0;
    let commentsCount = 0;

    totalPosts.forEach(post => {
      likesCount += post.likes.length;
      commentsCount += post.comments.length;
    });

    setTotalLikes(likesCount);
    setTotalComments(commentsCount);


  }, [totalUsers, totalPosts, totalLikes, totalComments]);

  const handleSideBarMouseOver = () => {
    setShowsideBar(true);
  }

  const handleSideBarMouseLeave = () => {
    setShowsideBar(false);
  }

  const handleSideBarClick = (page) => () => {
    setAdminContent(page);
    window.history.pushState(null, null, `/admin/${page}`);
  }


  return (
    <>
      <Navbar />
      <div className='AdminMainContainer'>
        <div className='AdminsideBar' onMouseOver={handleSideBarMouseOver} onMouseOut={handleSideBarMouseLeave}>
          <div className='AdminsideBarContainer'>
            <div  className='AdminsideBarHeader' style={{height: '4pc', alignItems: 'center', display: 'flex', justifyContent: 'space-around', flexDirection: 'row', width: 'inherit'}}>                
              <FontAwesomeIcon icon={faBlackTie} size={showsideBar? 'sm':'lg' } /> <h2 style={{display: showsideBar?'block': 'none'}} >Admin</h2>
            </div>
            <hr></hr>
            <div className='AdminsideBarOptions' style={{width: 'inherit'}}>
              <div style={AdminSideBarOption}  className='AdminsideBarOption' onClick={handleSideBarClick('DashBoard')} >
              <FontAwesomeIcon style={showsideBar?{width: '20%'}: {width: '100%'}} icon={faSolarPanel} size={showsideBar? 'sm':'lg' } /><h3 style={showsideBar?{width: '80%'}:{display: 'none'}}>{showsideBar? 'Dashboard': ''}</h3>
              </div>
              <div style={AdminSideBarOption}  className='AdminsideBarOption' onClick={handleSideBarClick('Users')}>
              <FontAwesomeIcon style={showsideBar?{width: '20%'}: {width: '100%'}} icon={faUsers} size={showsideBar? 'sm':'lg' } /> <h3 style={showsideBar?{width: '80%'}:{display: 'none'}}>{showsideBar? 'Users': ''}</h3>
              </div>
              <div style={AdminSideBarOption}  className='AdminsideBarOption' onClick={handleSideBarClick('Posts')}>
              <FontAwesomeIcon style={showsideBar?{width: '20%'}: {width: '100%'}} icon={faImages} size={showsideBar? 'sm':'lg' } /> <h3 style={showsideBar?{width: '80%'}:{display: 'none'}}>{showsideBar? 'Posts': ''}</h3>
              </div>
              <div style={AdminSideBarOption}  className='AdminsideBarOption' onClick={handleSideBarClick('Analytics')}>
              <FontAwesomeIcon style={showsideBar?{width: '20%'}: {width: '100%'}} icon={faChartSimple} size={showsideBar? 'sm':'lg' } /> <h3 style={showsideBar?{width: '80%'}:{display: 'none'}}>{showsideBar? 'Analytics': ''}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='MainComponentAdmin'>
          {
            adminContent==='DashBoard'?
            <AllStats totalTrafficNumber={totalTrafficNumber} totalTraffic={totalTraffic} totalUsers={totalUsers} totalPosts={totalPosts} />
            :
            adminContent==='Users'?
            <UserStats  totalUsers={totalUsers}/>
            :
            adminContent==='Posts'?
            <PostStats   totalUsers={totalUsers} totalPosts={totalPosts} />
            :
            adminContent==='Analytics'?
            <AllStats totalTrafficNumber={3} totalTraffic={totalTraffic} totalUsers={totalUsers} totalPosts={totalPosts} />
            :
            <AllStats totalTrafficNumber={4} totalTraffic={totalTraffic} totalUsers={totalUsers} totalPosts={totalPosts} />

          }
        </div>
      </div>
    </>
  );
};

export default AdminPage;
