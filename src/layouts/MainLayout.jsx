
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext

const MainLayout = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    // Apply theme-based styles to the main layout to maintain consistency across all pages
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Outlet /> {/* Outlet is used to render the current page based on routing */}
    </div>
  );
}

export default MainLayout;
