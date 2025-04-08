// src/components/TipOptions.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  TextField
} from '@mui/material';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { db, serverTimestamp } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const TipOptions = () => {
  const navigate = useNavigate();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTip, setCustomTip] = useState('');

  // Function to submit the email and tip to Firebase
  const submitData = async (tipAmount) => {
    // Retrieve the email saved in the DetailsForm step
    const email = localStorage.getItem('email') || "unspecified";
    const parsedTip = parseFloat(tipAmount) || 0;
    const submission = {
      tipAmount: parsedTip,
      email: email,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'tips'), submission);
      // Clear stored email after submission
      localStorage.removeItem('email');
      navigate('/thankyou');
    } catch (error) {
      console.error("Error writing document: ", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Handlers for preset tip options
  const handlePresetTip = (tip) => {
    submitData(tip);
  };

  // Handler for custom tip confirmation
  const handleCustomConfirm = () => {
    const tipValue = parseFloat(customTip);
    if (isNaN(tipValue) || tipValue < 0.1 || tipValue > 10000) {
      alert('Please enter a valid tip value between 0.1 and 10000');
      return;
    }
    submitData(tipValue);
  };

  // Handler for "No Tip" option
  const handleNoTip = () => {
    submitData(0);
  };

  return (
    <>
      {/* Show back arrow here so user can return to the email step if needed */}
      <Header showBack={true} />
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Choose a tip amount
        </Typography>
        {/* Preset tip options */}
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          {['15', '18', '20'].map((tip) => (
            <Grid item xs={6} sm={3} key={tip}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handlePresetTip(tip)}
                sx={{ py: 2, minHeight: '56px' }}
              >
                {tip}%
              </Button>
            </Grid>
          ))}
        </Grid>
        {/* Custom Tip Option */}
        <Box sx={{ mt: 4, width: '100%' }}>
          {showCustomInput ? (
            // Replace the button with an input field and proceed button
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'stretch'
              }}
            >
              <TextField
                label="Tip (%)"
                type="number"
                variant="outlined"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                InputProps={{ inputProps: { step: 0.1, min: 0.1, max: 10000 } }}
                sx={{ flex: '0 0 20%', mr: 1 }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleCustomConfirm}
                sx={{ flex: '0 0 80%', minHeight: '56px' }}
              >
                Proceed
              </Button>
            </Box>
          ) : (
            // Full-width "Custom Tip" button which, when clicked, is replaced by the input row.
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setShowCustomInput(true)}
              sx={{ py: 2, minHeight: '56px' }}
            >
              Custom Tip
            </Button>
          )}
        </Box>
        {/* No Tip Button */}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="text"
            fullWidth
            onClick={handleNoTip}
            sx={{
              py: 2,
              minHeight: '56px',
              color: 'lightgrey',
              fontWeight: 400
            }}
          >
            No Tip
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default TipOptions;
