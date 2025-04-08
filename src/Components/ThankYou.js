// src/components/ThankYou.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header showBack={false} />
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Thank You!
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/')}
            sx={{ py: 2 }}
          >
            Done
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ThankYou;
