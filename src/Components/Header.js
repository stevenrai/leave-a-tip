// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Header = ({ showBack = false }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate back to tip selection screen
    navigate('/');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {showBack ? (
          <IconButton edge="start" color="inherit" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        ) : (
          // Place an empty Box so the title stays centered
          <Box sx={{ width: 48 }} />
        )}
        <Typography variant="h6" component="div">
          Just the tip for SR
        </Typography>
        {/* Empty Box on the right to balance the layout */}
        <Box sx={{ width: 48 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
