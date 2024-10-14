
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { UserContext } from '../App';
import { ThemeContext } from '../ThemeContext';

const Navbar = () => {
  const [user, setUser] = React.useContext(UserContext);
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const navigate = useNavigate();

  const logOutCallback = async () => {
    await fetch('/routes/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser({});
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} relative z-50`}>
      <div className="mx-auto max-w-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link className="flex items-center mr-4" to="/">
              <img className="h-10 w-12" src={logo} alt="InnVoice" />
              <span className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-2xl font-bold ml-2`}>
                InnVoice
              </span>
            </Link>
          </div>
          <button onClick={toggleMenu} className="text-3xl focus:outline-none ml-auto md:ml-0">
            <span className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>&#9776;</span> {/* Hamburger icon for dropdown menu */}
          </button>
        </div>
        <div className={`absolute top-16 left-0 w-full ${isOpen ? 'block' : 'hidden'} z-50`}>
          <ul className={`flex flex-col p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} text-center`}>
            <li className="my-2">
              <Link to="/" className={`block py-2 px-4 hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>Home</Link>
            </li>
            <li className="my-2">
              <Link to="/dashboard" className={`block py-2 px-4 hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>Dashboard</Link>
            </li>
            <li className="my-2">
              <Link to="/signup" className={`block py-2 px-4 hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>Signup</Link>
            </li>
            <li className="my-2">
              <Link to="/login" className={`block py-2 px-4 hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>Login</Link>
            </li>
            <li className="my-2">
              <button onClick={logOutCallback} className={`block w-full py-2 px-4 hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>Log Out</button>
            </li>
            <li className="my-2">
              <button onClick={toggleTheme} className={`block w-full py-2 px-4 hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
