/* Updated Signup.jsx */
import { useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BackgroundLogo from '../components/BackgroundLogo';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext

// Signup component handles the signup form and its submission
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });  // Manage form data with useState
  const [message, setMessage] = useState('');  // Manage success message
  const [error, setError] = useState('');  // Manage error message
  const { theme } = useContext(ThemeContext); // Get the current theme

  // Updates form data when user types into inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });  // Update form data based on input changes
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevents the page from reloading when the form is submitted
    try {
      const response = await axios.post('/routes/users/signup', formData);  // Send data to backend
      setMessage('🎉 Registration successful!');  // Display success message on successful registration
      setError('');  // Clear any previous error
    } catch (error) {
      console.error('Error during sign-up:', error);  // Log error in the console
      setError('⚠️ Registration failed. Please try again.');  // Display error message
      setMessage('');  // Clear success message
    }
  };

  return (
    <>
      <Navbar />  {/* Navbar at the top of the page */}
      <BackgroundLogo>  {/* Wrap the form with the logo background */}
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-8 rounded-lg shadow-lg w-full space-y-6`}>
          <h1 className="text-3xl font-bold text-center">Create Your Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}  // Sets input value to the state
                onChange={handleChange}  // Updates state when input changes
                className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'} w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400`}
                placeholder="Enter your username"  // Placeholder text
                required
              />
            </div>
            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}  // Sets input value to the state
                onChange={handleChange}  // Updates state when input changes
                className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'} w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400`}
                placeholder="you@example.com"  // Placeholder text
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
                value={formData.password}  // Sets input value to the state
                onChange={handleChange}  // Updates state when input changes
                className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'} w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-red-400`}
                placeholder="Create a password"  // Placeholder text
                required
              />
            </div>
            {/* Submit button */}
            <button type="submit" className={`${theme === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} w-full py-3 px-4 rounded-lg`}>
              Sign Up
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
    </>
  );
};

export default Signup;