import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const OrganizationProfile = ({ user_details }) => {
  const { username, followers, following, profilepicture } = user_details;
  const [coverPhoto, setCoverPhoto] = useState('/default-cover.jpg');

  return (
    <Card>
      <div style={{ position: 'relative' }}>
        <img src={coverPhoto} alt='Cover' style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <Avatar
          alt='Profile Picture'
          src={profilepicture}
          sx={{ position: 'absolute', bottom: -50, left: '50%', transform: 'translateX(-50%)', width: 100, height: 100 }}
        />
      </div>
      <CardContent>
        <Card>
          <CardContent>
            <Typography variant='h5'>{username}</Typography>            
          </CardContent>
        </Card>
        <Card>
          
        </Card>
        <Card>
        <CardContent>
            <Typography variant='body1'>Followers: {followers.length}</Typography>            
          </CardContent>
          <CardContent>
            <Typography variant='body1'>Following: {following.length}</Typography>
          </CardContent>
        </Card>
      </CardContent>
      {/* Additional cards and components can be added here */}
    </Card>
  );
};

export default OrganizationProfile;
