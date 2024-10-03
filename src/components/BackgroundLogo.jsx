import React from 'react';
import logo2 from '../assets/images/logo2.png';  // Import the logo image to be used as the background

// This component wraps its children with a background image (logo) behind them
const BackgroundLogo = ({ children }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 relative"  // Centers the content on the screen
      style={{
        backgroundImage: `url(${logo2})`,  // Sets the logo as the background image
        backgroundSize: '300px',           // Controls the size of the logo image (300px)
        backgroundPosition: 'top',         // Positions the logo at the top of the screen
        backgroundRepeat: 'no-repeat',     // Prevents the background image from repeating
        //opacity: '.75',                    // Makes the background image semi-transparent
      }}
    >
      {/* Child content (e.g., forms) will be displayed here on top of the background */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg">
        {children}  {/* This will render any components passed inside BackgroundLogo */}
      </div>
    </div>
  );
};

export default BackgroundLogo;