import React, { useEffect, useState } from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import AdminSmallNumberCard from '../../Component/Admin/AdminSmallNumberCard';
import axios from 'axios';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPage = () => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalPosts, setTotalPosts] = useState([]);
  const [totalTraffic, setTotalTraffic] = useState([]);
  const [totalTrafficNumber, setTotalTrafficNumber] = useState(0);

  const navigate = useNavigate();
  const userDetails = useSelector((state)=>state.user);
  const Backendport = process.env.REACT_APP_BACKEND_PORT;
  let user = userDetails.user;
  let id =user.user._id;
  const jwt_here=user.jwttoken

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:${Backendport}/api/user/get/allusers`,{
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
      const response = await axios.get(`http://localhost:${Backendport}/api/post/get/allposts`,{
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
      const response = await axios.get(`http://localhost:${Backendport}/api/admin/log`,{
        headers:{
          jwttoken: jwt_here
        }
      });
      setTotalTrafficNumber(response.data.numberOfRequests);
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


  const toggleDropdown = (ID) => {
    // alert(userId)
    document.getElementById(ID).classList.toggle('show');

  };

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


  return (
    <>
      <Navbar />
      <div className='AdminMainContainer'>
        <div className='AdminsideBar'>
        </div>
        <div className='MainComponentAdmin'>
          <div className='adminContainer'>
            <AdminSmallNumberCard CardName={'Traffic'} CardValue= {totalTrafficNumber} />
            <AdminSmallNumberCard CardName={'Posts'} CardValue={400} />  
            <AdminSmallNumberCard CardName={'Users'} CardValue={400}/>
            <AdminSmallNumberCard CardName={'Likes'} CardValue={400}/>
          </div>
          <div className='adminContainer'>
            {totalTraffic}
          </div>
          <div className='Adminsection1 adminContainer'>
            <h2>Total Users</h2>
            <div className='userList scroll'>
              {totalUsers.map((user) => {
                return (
                  <div className='user' id={user._id} onClick={() => toggleDropdown(user._id)} >
                    <div className='userHeader'>
                      <h3 style={{    margin: '5px 10px'}} >{user.username}</h3>
                      <div className='dropdown'>
                        <button className='dropbtn'> 
                          ...
                        </button>
                        <div className={`dropdown-content`}>
                          <button className='dropbtn' onClick={()=> navigate(`/profilepage/${user._id}`)}>Goto Profile</button>
                          <button className='dropbtn delete' style={{width: '100%'}}>Delete</button> 
                        </div>
                      </div>
                    </div>
                    <div className='userDetails'>
                      <p className='userDetail'>Email : {user.email}</p>
                      <p className='userDetail'>PhoneNumber : {user.phonenumber}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='Adminsection2 adminContainer'>
            <h2>Total Posts {totalPosts.length}</h2>
            <div className='postList scroll'>
              {totalPosts.map((post) => {
                return (
                  <div className='Adminpost' id={post._id} onClick={() => toggleDropdown(post._id)}>
                    
                      <div className='AdminpostHeader' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-around'}}>
                        <div>
                          <h3>{post._id}</h3>
                          <div className='AdminpostDetails'>
                          <p className='AdminpostDetail'>Description : {post.description}</p>
                          <p className='AdminpostDetail'>User : {post.user}</p>
                          <p className='AdminpostDetail'>Likes : {post.likes.length}</p>
                          </div>
                        </div>
                        <img className="AdminPostImage" src={post.image} alt='post' />
                      </div>
                      
                    
                    <div className='dropdown'>
                      <button className='dropbtn'>...</button>
                      <div className={`dropdown-content`}>
                        <button className='dropbtn delete' style={{width: '100%'}}>Delete</button>
                      </div>
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
