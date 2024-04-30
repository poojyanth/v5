import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import image3 from "../Images/default-cover-4.jpeg";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Message';

const OrganizationProfile = ({ user_details, setUser_Details }) => {

  const { username, followers, following, profilepicture, bio } = user_details;

  return (
    <>
      <Card sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar alt={username} src={profilepicture} sx={{ width: '30vh', height: '30vh' }} />
            </Grid>
            <Grid item xs={12} sm={7} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <Typography variant="h5">{username}</Typography>
                <Box>
                  <Button variant="contained" sx={{ mr: 1, backgroundColor: 'var(--primary-button-color)', '&:hover': {backgroundColor: 'var(--primary-button-color-hover)'}}}>Edit Profile</Button>
                  <Button variant="contained" sx={{ mr: 1, backgroundColor: 'var(--primary-button-color)', '&:hover': {backgroundColor: 'var(--primary-button-color-hover)'}}}>Settings</Button>
                </Box>
              </Box>
              <Typography variant="body1" color="textSecondary">{bio}</Typography>
              <Divider />
              <Box sx={{ display: 'flex',width: '100%' }}>
                <Typography variant="subtitle1" sx={{margin: '0 2vw 0 0'}}>Followers: <span style={{fontWeight: 'bold', fontSize: 'medium'}}>{followers?.length}</span></Typography>
                <Typography variant="subtitle1" sx={{margin: '0 2vw 0 0'}}>Following: <span style={{fontWeight: 'bold', fontSize: 'medium'}}>{following?.length}</span></Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <hr style={{margin: '0 5vw'}}/>
    </>
  );
};

export default OrganizationProfile;
