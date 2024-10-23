
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/ProtectedTest';
import axios from 'axios';
import ThemeProvider from './ThemeContext';

// UserContext is used to store and provide user data across the application
export const UserContext = React.createContext([]);

function App() {
  // State to manage user information and loading status
const [user, setUser] = useState({});
//const [loading, setLoading] = useState(true);

  // // useEffect to check for a valid refresh token upon loading the app
  // useEffect(() => {
  //   async function checkRefreshToken() {
  //     const result = await axios.post('/routes/tokens/refresh_token', {
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });

  //     // Set the user state with the received access token and stop loading
  //     setUser({
  //       accessToken: result.accessToken,
  //     });
  //     setLoading(false);
  //   }
  //   checkRefreshToken(); // Call the function when the component mounts
  // }, []); // Empty dependency array to run only once when the component mounts

  // // Display a loading message while waiting for user data
  // if (loading) return <div>Loading ...</div>;

  // Define the routes for the application using React Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFoundPage />} /> {/* Catch-all for undefined routes */}
      </Route>
    )
  );

  // Render the app wrapped with ThemeProvider and UserContext to manage theme and user state globally
  return (
    <ThemeProvider>
      <UserContext.Provider value={[user, setUser]}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
