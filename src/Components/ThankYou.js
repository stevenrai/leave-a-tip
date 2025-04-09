// src/components/ThankYou.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();
  const [tipValue, setTipValue] = useState(null);

  useEffect(() => {
    const storedTip = localStorage.getItem('selectedTip');
    if (storedTip) {
      setTipValue(parseFloat(storedTip));
      // Optionally remove it after reading:
      // localStorage.removeItem('selectedTip');
    }
  }, []);
  

  let imageElement = null;
  if (tipValue !== null) {
    if (tipValue < 13) {
      imageElement = (
        <Box sx={{ mb: 2 }}>
          <img
            src="https://media.tenor.com/jtuawlTRjzsAAAAM/comeon-allyougot.gif"
            alt="Low tip encouragement"
            style={{ maxWidth: '100%' }}
          />
        </Box>
      );
    } else if (tipValue >= 13) {
      imageElement = (
        <Box sx={{ mb: 2 }}>
          <img
            src="https://staffino.com/blog/wp-content/uploads/2016/09/201504_1143_abfih_sm.jpg"
            alt="Appreciation for generous tip"
            style={{ maxWidth: '100%' }}
          />
        </Box>
      );
    }
  }

  return (
    <>
      <Header showBack={false} />
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Transaction Complete
        </Typography>
        {/* Conditionally render image based on tip value */}
        {imageElement}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/')}
            sx={{ py: 2, minHeight: '56px' }}
          >
            Done
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ThankYou;
