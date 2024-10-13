import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext

const Dashboard = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg shadow-lg`}>
            <h2 className="text-xl font-semibold">Room Status</h2>
            {/* Placeholder content */}
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg shadow-lg`}>
            <h2 className="text-xl font-semibold">Guests</h2>
            {/* Placeholder content */}
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg shadow-lg`}>
            <h2 className="text-xl font-semibold">Cleaning Schedule</h2>
            {/* Placeholder content */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
