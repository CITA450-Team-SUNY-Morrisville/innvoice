import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext

const MainLayout = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Outlet />
    </div>
  );
}

export default MainLayout;
