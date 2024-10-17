
import React, { createContext, useState } from 'react';

// Creating a ThemeContext to provide light/dark theme settings throughout the application
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // State to manage the current theme, initialized to 'dark'
  const [theme, setTheme] = useState('dark');

  // Function to toggle between 'dark' and 'light' theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    // Provide theme and toggle function to all child components
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div> {/* Apply the theme class to wrap all child components */}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
