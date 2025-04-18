// src/components/TipOptions.js
import React, { useState, useEffect } from 'react';
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
  const [experience, setExperience] = useState('Basic');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTip, setCustomTip] = useState('');

  useEffect(() => {
    setExperience(localStorage.getItem('experience') || 'Basic');
  }, []);

  const submitData = async (tipAmount) => {
    localStorage.setItem('selectedTip', tipAmount);
    const email = localStorage.getItem('email') || 'unspecified';
    const parsedTip = parseFloat(tipAmount) || 0;
    const submission = { tipAmount: parsedTip, email, timestamp: serverTimestamp() };

    try {
      await addDoc(collection(db, 'tips'), submission);
      localStorage.removeItem('email');
      localStorage.removeItem('experience');
      navigate('/thankyou');
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  };

  const handlePresetTip = (tip) => submitData(tip);
  const handleNoTip = () => submitData(0);
  const handleCustomConfirm = () => {
    const val = parseFloat(customTip);
    if (isNaN(val) || val < 0.1 || val > 10000) {
      alert('Enter a value between 0.1 and 10000');
      return;
    }
    submitData(val);
  };

  // Define preset buttons based on experience
  const presets = experience === 'Political'
    ? [ { label: 'Israel', value: '15' }, { label: 'Palestine', value: '18' }, { label: '20%', value: '20' } ]
    : [ { label: '15%', value: '15' }, { label: '18%', value: '18' }, { label: '20%', value: '20' } ];

  return (
    <>
      <Header showBack={true} />
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Just one question…
        </Typography>

        {/* Preset tip options */}
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          {presets.map(({ label, value }) => (
            <Grid item xs={6} sm={3} key={value}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handlePresetTip(value)}
                sx={{ py: 2, minHeight: '56px' }}
              >
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* Custom Tip */}
        <Box sx={{ mt: 4, width: '100%' }}>
          {showCustomInput ? (
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'stretch' }}>
              <TextField
                label="Custom Tip (%)"
                type="number"
                variant="outlined"
                value={customTip}
                onChange={e => setCustomTip(e.target.value)}
                InputProps={{ inputProps: { step: 0.1, min: 0.1, max: 10000 } }}
                sx={{ flex: '0 0 70%', mr: 1 }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleCustomConfirm}
                sx={{ flex: '0 0 30%', minHeight: '56px' }}
              >
                Proceed
              </Button>
            </Box>
          ) : (
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

        {/* No Tip */}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="text"
            fullWidth
            onClick={handleNoTip}
            sx={{ py: 2, minHeight: '56px', color: 'lightgrey', fontWeight: 400 }}
          >
            No Tip
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default TipOptions;
