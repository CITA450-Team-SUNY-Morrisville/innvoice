
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  // Import Footer component
import BackgroundLogo from '../components/BackgroundLogo';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });  // State to manage form data
  const [message, setMessage] = useState('');  // State to manage success message
  const [error, setError] = useState('');  // State to manage error message
  const { theme } = useContext(ThemeContext); // Get the current theme

  const navigate = useNavigate();  // Hook to navigate between routes

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    try {
      const response = await axios.post('/routes/users/login', formData);  // Send login request to server
      setMessage('🎉 Login successful!');  // Set success message
      setError('');  // Clear any existing errors
      navigate("/dashboard");  // Navigate to dashboard on success
    } catch (error) {
      console.error('Error during login:', error);  // Log error in the console
      setError('⚠️ Login failed. Please check your credentials.');  // Set error message
      setMessage('');  // Clear success message
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
      {/* Navbar at the top of the page */}
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        {/* Background logo wraps the login form */}
        <BackgroundLogo>
          <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-8 rounded-lg shadow-lg w-full max-w-md space-y-6`}>
            <h1 className="text-3xl font-bold text-center">Log In</h1>
            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'} w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400`}
                  placeholder="you@example.com"
                  required
                />
              </div>
              {/* Password input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'} w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400`}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {/* Submit button */}
              <button type="submit" className={`${theme === 'dark' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-blue-600 text-white hover:bg-blue-700'} w-full py-3 px-4 rounded-lg`}>
                Log In
              </button>
            </form>
            {/* Display success message */}
            {message && (
              <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                {message}
              </div>
            )}
            {/* Display error message */}
            {error && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </BackgroundLogo>
      </div>
      {/* Footer at the bottom of the page */}
      <Footer />
    </div>
  );
};

export default Login;
