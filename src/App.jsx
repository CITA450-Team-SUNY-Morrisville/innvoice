import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';  // Ensure this path is correct
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/ProtectedTest';
import RoomsPage from './pages/Rooms'
import ReservationsPage from './pages/Reservations'
import axios from 'axios';
import ThemeProvider from './ThemeContext';

// UserContext is used to store and provide user data across the application
export const UserContext = React.createContext([]);

function App() {
  // State to manage user information and loading status
  const [user, setUser] = useState({});

  // Define the routes for the application using React Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<LoginPage />} /> {/* Default route to login */}
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />  {/* Ensure this is correct */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/rooms' element={<RoomsPage />} />
        <Route path='/reservations' element={<ReservationsPage />} />
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