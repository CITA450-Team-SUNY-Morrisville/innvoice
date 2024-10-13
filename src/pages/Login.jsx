import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BackgroundLogo from '../components/BackgroundLogo';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { theme } = useContext(ThemeContext); // Get the current theme

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/routes/users/login', formData);
      setMessage('🎉 Login successful!');
      setError('');
      const token = response.data.accessToken;
      navigate("/dashboard");
    } catch (error) {
      console.error('Error during login:', error);
      setError('⚠️ Login failed. Please check your credentials.');
      setMessage('');
    }
  };

  return (
    <>
      <Navbar />
      <BackgroundLogo>
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} p-8 rounded-lg shadow-lg w-full space-y-6`}>
          <h1 className="text-3xl font-bold text-center">Log In</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button type="submit" className={`${theme === 'dark' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-blue-600 text-white hover:bg-blue-700'} w-full py-3 px-4 rounded-lg`}>
              Log In
            </button>
          </form>
          {message && (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              {message}
            </div>
          )}
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
