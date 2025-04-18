// src/components/DetailsForm.js
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl
} from '@mui/material';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const DetailsForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('Basic');

  const handleNext = () => {
    // Store both email and experience
    localStorage.setItem('email', email);
    localStorage.setItem('experience', experience);
    navigate('/tips');
  };

  return (
    <>
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

          <FormControl component="fieldset" sx={{ mt: 3, textAlign: 'left' }}>
            <FormLabel component="legend">Choose your experience</FormLabel>
            <RadioGroup
              row
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <FormControlLabel
                value="Basic"
                control={<Radio />}
                label="Basic"
              />
              <FormControlLabel
                value="Political"
                control={<Radio />}
                label="Political"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleNext}
              sx={{ py: 2, minHeight: '56px' }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DetailsForm;
