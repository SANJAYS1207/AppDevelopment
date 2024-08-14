import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function UpdateProfile() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const history = useHistory();

  const handleUpdate = () => {
    const updatedDetails = {
      phoneNumber,
      address,
    };

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    // Send update request to the backend
    fetch(`http://localhost:3002/signinmodel/${userDetails.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update local storage with the new details
        localStorage.setItem(
          'userDetails',
          JSON.stringify({ ...userDetails, ...updatedDetails })
        );
        history.push('/'); // Redirect to the homepage after update
      })
      .catch((error) => console.error('Error updating user details:', error));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
      <TextField
        label="Phone Number"
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <TextField
        label="Address"
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </Box>
  );
}

export default UpdateProfile;
