import React, { useEffect, useState } from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import axios from 'axios';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto'; // Import chart.js library

const AdminPage = () => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalPosts, setTotalPosts] = useState([]);

  const navigate = useNavigate();
  const Backendport = process.env.REACT_APP_BACKEND_PORT;

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:${Backendport}/api/user/get/allusers`);
      setTotalUsers(response.data.allUsersList); // Assuming the response contains an 'allUsersList' field
    } catch (error) {
      console.log("ERROR OCCURRED IN CATCH BLOCK:", error);
    }
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:${Backendport}/api/post/get/allposts`);
      setTotalPosts(response.data.post); // Assuming the response contains an 'allPostsList' field
    } catch (error) {
      console.log("ERROR OCCURRED IN CATCH BLOCK:", error);
    }
  };

  useEffect(() => {
    getUsers();
    getPosts();
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

    // Create pie charts
    createPieChart('usersChart', 'Total Users', totalUsers.length);
    createPieChart('postsChart', 'Total Posts', totalPosts.length);
    createPieChart('likesChart', 'Total Likes', totalLikes);
    createPieChart('commentsChart', 'Total Comments', totalComments);
  }, [totalUsers, totalPosts, totalLikes, totalComments]);

  // Function to create pie chart
  const createPieChart = (chartId, label, value) => {
    const ctx = document.getElementById(chartId);
    const existingChart = Chart.getChart(ctx);

    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [label, 'Remaining'],
        datasets: [
          {
            label: label,
            data: [value, Math.max(0, 50 - value)], // Assuming maximum value is 100
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)', // Color for the value
              'rgba(255, 99, 132, 0.6)' // Color for the remaining part of the pie chart
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        // Other chart options as needed
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className='MainComponentAdmin'>
      <div className='Adminsection3 adminContainer'>
          <h2>Pie Charts</h2>
          <div className='pieChartsContainer'>
            <canvas id='usersChart' width='200' height='200'></canvas>
            <canvas id='postsChart' width='200' height='200'></canvas>
            <canvas id='likesChart' width='200' height='200'></canvas>
            <canvas id='commentsChart' width='200' height='200'></canvas>
          </div>
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
    </>
  );
};

export default AdminPage;
