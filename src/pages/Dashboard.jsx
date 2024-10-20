
import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  // Import Footer component
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext to manage theme settings

const Dashboard = () => {
  const { theme } = useContext(ThemeContext); // Use theme context to determine the current theme (dark or light)

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
      {/* Navbar at the top of the page */}
      <Navbar />
      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Room Status section */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg shadow-lg`}>
            <h2 className="text-xl font-semibold">Room Status</h2>
            {/* Placeholder content */}
          </div>
          {/* Guests section */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg shadow-lg`}>
            <h2 className="text-xl font-semibold">Guests</h2>
            {/* Placeholder content */}
          </div>
          {/* Cleaning Schedule section */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg shadow-lg`}>
            <h2 className="text-xl font-semibold">Cleaning Schedule</h2>
            {/* Placeholder content */}
          </div>
        </div>
      </div>
      {/* Footer at the bottom of the page */}
      <Footer />
    </div>
  );
}

export default Dashboard;
