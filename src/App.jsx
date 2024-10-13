
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

export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkRefreshToken() {
      const result = await axios.post('/routes/tokens/refresh_token', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setUser({
        accessToken: result.accessToken,
      });
      setLoading(false);
    }
    checkRefreshToken();
  }, []);

  if (loading) return <div>Loading ...</div>;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <ThemeProvider>
      <UserContext.Provider value={[user, setUser]}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
