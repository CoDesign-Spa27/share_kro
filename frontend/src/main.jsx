import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css'; // Import index.css here
import { ThemeProvider } from './contexts/ThemeContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <ThemeProvider >
    <GoogleOAuthProvider  clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
      <App />
    </GoogleOAuthProvider>
    </ThemeProvider>
  </Router> 
);