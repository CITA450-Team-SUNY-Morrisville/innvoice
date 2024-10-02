import React from 'react';
import Navbar from '../components/Navbar';  // Import the Navbar component
import Hero from '../components/Hero';  // Import the Hero component
import BackgroundLogo from '../components/BackgroundLogo';  // Import the BackgroundLogo component

// HomePage component that renders the full home page
const HomePage = () => {
  return (
    <>
      <Navbar />  {/* Displays the navigation bar at the top */}
      <Hero />     {/* Displays the Hero component with welcome text */}
      <BackgroundLogo/>  {/* Adds the logo as a background for the page */}
    </>
  );
}

export default HomePage;