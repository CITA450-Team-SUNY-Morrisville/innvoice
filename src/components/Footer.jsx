
import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';  // Import ThemeContext

const Footer = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-200 text-black'} p-6 mt-10`}>
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} InnVoice. All rights reserved.</p>
        <div className="mt-4">
          {/* Social Media Links */}
          <a href="https://www.facebook.com/InnVoicePage" target="_blank" rel="noopener noreferrer" className="mr-4 hover:text-red-500">Facebook</a>
          <a href="https://www.twitter.com/InnVoiceProfile" target="_blank" rel="noopener noreferrer" className="mr-4 hover:text-red-500">Twitter</a>
          <a href="https://www.instagram.com/InnVoiceProfile" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
