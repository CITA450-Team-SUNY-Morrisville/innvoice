
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Entry point for rendering the entire React application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Render the main App component within StrictMode for highlighting potential issues */}
  </StrictMode>,
);
