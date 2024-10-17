import { useState } from 'react';  // useState is used for managing form input state
import axios from 'axios';  // Axios is used for making HTTP requests
import Navbar from '../components/Navbar';  // Import the Navbar component
import BackgroundLogo from '../components/BackgroundLogo';  // Import the BackgroundLogo component
import { UserContext } from '../App';

// Login component handles the login form and submission
const Login = () => {

  const [message, setMessage] = useState('');  // State for success message
  const [error, setError] = useState('');  // State for error message
  const [user, setUser] = useState(UserContext);

    // Handles form submission
    const handleSubmit = async (e) => {
      e.preventDefault();  // Prevents the page from reloading when the form is submitted
      try {
        const response = await axios.post('/routes/protected/test', {
          headers: {
              'Authorization': `Bearer ${user.accessToken}`
          }
      });  // Sends form data to the server
        setMessage('🎉 Test successful!');  // Success message on login
        setError('');  // Clear any previous error
      } catch (error) {
        console.error('Error during test:', error);  // Log error in the console
        setError('⚠️ test failed. Please check your credentials.');  // Display error message
        setMessage('');  // Clear success message
      }
    };

  return (
    <>
      <Navbar />  {/* Navbar at the top of the page */}
      <BackgroundLogo>  {/* Wrap the form with the logo background */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full space-y-6">
          <h1 className="text-3xl font-bold text-center text-white">Log In</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Submit button */}
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg">
              TestPost
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

export default Login;