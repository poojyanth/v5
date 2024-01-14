import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const notifySuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000, // Close the toast after 3 seconds
      style: {
        borderRadius: '10px',
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
        borderRadius: '10px',
        fontSize: '14px', // Adjust font size
        width: '250px' // Adjust width
      }
    });
  };

  const notifyUploading = (message) => {
    toast.info(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000, // Close the toast after 3 seconds
      style: {
        borderRadius: '10px',
        fontSize: '14px', // Adjust font size
        width: '250px' // Adjust width
      }
    });
  }

export {notifySuccess, notifyError,notifyUploading, ToastContainer};