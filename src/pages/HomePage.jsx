
import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  // Import Footer component
import Hero from '../components/Hero';  // Import Hero component for main banner
import BackgroundLogo from '../components/BackgroundLogo';  // Import BackgroundLogo for visual effect
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext

const HomePage = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
      {/* Navbar at the top of the page */}
      <Navbar />
      {/* Main Hero section */}
      <Hero />
      {/* Background logo */}
      <BackgroundLogo />
      {/* Footer at the bottom of the page */}
      <Footer />
    </div>
  );
}

export default HomePage;
