import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { UserContext } from '../App';
import { ThemeContext } from '../ThemeContext';

const Navbar = () => {
  const [user, setUser] = React.useContext(UserContext);
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const navigate = useNavigate();

  const logOutCallback = async () => {
    await fetch('/routes/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser({});
    navigate('/');
  };

  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border-b border-gray-800`}>  
      <div className="mx-auto max-w-auto px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-12" src={logo} alt="InnVoice"/>
              <span className={`${theme === 'dark' ? 'text-white' : 'text-black'} hidden md:block text-3xl font-bold ml-2`}>
                InnVoice
              </span>
            </Link>
            <div className="md:ml-auto flex space-x-2">
              <Link to="/" className={`${theme === 'dark' ? 'text-white bg-gray-700 hover:bg-gray-800' : 'text-black bg-gray-300 hover:bg-gray-400'} rounded-md px-4 py-2`}>
                Home
              </Link>
              <Link to="/dashboard" className={`${theme === 'dark' ? 'text-white bg-gray-700 hover:bg-gray-800' : 'text-black bg-gray-300 hover:bg-gray-400'} rounded-md px-4 py-2`}>
                Dashboard
              </Link>
              <Link to="/signup" className={`${theme === 'dark' ? 'text-white bg-red-600 hover:bg-red-700' : 'text-white bg-blue-600 hover:bg-blue-700'} rounded-md px-4 py-2`}>
                Sign Up
              </Link>
              <Link to="/login" className={`${theme === 'dark' ? 'text-white bg-gray-700 hover:bg-gray-800' : 'text-black bg-gray-300 hover:bg-gray-400'} rounded-md px-4 py-2`}>
                Login
              </Link>
              <button onClick={logOutCallback} className={`${theme === 'dark' ? 'text-white bg-red-600 hover:bg-gray-800' : 'text-white bg-blue-600 hover:bg-blue-700'} rounded-md px-4 py-2`}>
                Log Out
              </button>
              <button onClick={toggleTheme} className="text-sm ml-4">
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;