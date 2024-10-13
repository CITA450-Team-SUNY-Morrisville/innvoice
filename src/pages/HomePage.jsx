import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BackgroundLogo from '../components/BackgroundLogo';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext

const HomePage = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Navbar />
      <Hero />
      <BackgroundLogo />
    </div>
  );
}

export default HomePage;
