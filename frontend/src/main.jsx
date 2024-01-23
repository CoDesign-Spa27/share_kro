import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css'; // Import index.css here

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <GoogleOAuthProvider  clientId="256243008686-0pgcf44q03ncbm5o8ggcd2l7bh2d58bu.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Router> 
);