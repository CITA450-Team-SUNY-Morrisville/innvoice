
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
      {/* Buttons added to the homepage */}
      <div className="flex justify-center mt-10 space-x-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Manage Guests</button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Manage Rooms</button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Manage Reservations</button>
      </div>
      {/* Background logo */}
      <BackgroundLogo />
      {/* Footer at the bottom of the page */}
      <Footer />
    </div>
  );
}

export default HomePage;
