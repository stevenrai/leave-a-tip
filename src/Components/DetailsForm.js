// src/components/DetailsForm.js
import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const DetailsForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleNext = () => {
    // Save the email for later use (to be retrieved in TipOptions)
    localStorage.setItem('email', email);
    // Navigate to the tip selection page (we’ll call that route "/tips")
    navigate('/tips');
  };

  return (
    <>
      {/* No back arrow here since this is the first step */}
      <Header showBack={false} />
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your Email
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleNext} fullWidth sx={{ py: 2, minHeight: '56px' }}>
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DetailsForm;
