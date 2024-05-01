import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import image3 from "../Images/default-cover-4.jpeg";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';

/**
 * 
 * Number of posts by the organization - daily
 * Likes on the posts
 * Comments on the posts
 * Follows on the organization
 * 
 */

const OrganizationProfile = ({ user_details, setUser_Details }) => {
  const navigate = useNavigate();
 
  const { username, followers, following, profilepicture, bio } = user_details;

  useEffect(() => {
    // Call functions to create charts once component mounts
    createorgChart1();
    // createChart2();
    // createChart3();
    // createChart4();
  }, []);

  let orgChart1;

  const createorgChart1 = () => {
    if (orgChart1) {
      orgChart1.destroy();
    }
    // Function to create Chart 1
    const ctx = document.getElementById('orgChart1');
    orgChart1 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Dataset 1',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: [65, 59, 80, 81, 56, 55, 40]
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <>
      <Card sx={{backgroundColor: '(--var(primary-color))', boxShadow: 'none', margin: '2vh', borderRadius: '10px'}}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar alt={username} src={profilepicture} sx={{ width: '30vh', height: '30vh' }} />
            </Grid>
            <Grid item xs={12} sm={7} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <Typography variant="h5">{username}</Typography>
                <Box>
                  <Button onClick={()=>navigate('/settings')} variant="contained" sx={{ mr: 1, backgroundColor: 'var(--primary-button-color)', '&:hover': {backgroundColor: 'var(--primary-button-color-hover)'}}}>Edit Profile</Button>
                  <Button onClick={()=>navigate('/settings')} variant="contained" sx={{ mr: 1, backgroundColor: 'var(--primary-button-color)', '&:hover': {backgroundColor: 'var(--primary-button-color-hover)'}}}>Settings</Button>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex',width: '100%' }}>
                <Typography variant="subtitle1" sx={{margin: '0 2vw 0 0'}}>Followers: <span style={{fontWeight: 'bold', fontSize: 'medium'}}>{followers?.length}</span></Typography>
                <Typography variant="subtitle1" sx={{margin: '0 2vw 0 0'}}>Following: <span style={{fontWeight: 'bold', fontSize: 'medium'}}>{following?.length}</span></Typography>
              </Box>
              <Typography variant="body1" color="textSecondary">{bio}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <hr style={{margin: '0 5vw'}}/>
      <Card>
      <canvas id="orgChart1" width="400" height="400"></canvas>
      </Card>
    </>
  );
};

export default OrganizationProfile;