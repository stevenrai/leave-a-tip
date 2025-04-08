// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailsForm from './Components/DetailsForm'; // Now email step
import TipOptions from './Components/TipOptions';       // Tip selection step
import ThankYou from './Components/ThankYou';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DetailsForm />} />
        <Route path="/tips" element={<TipOptions />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </Router>
  );
};

export default App;
