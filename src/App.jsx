import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';  // Import Login
<<<<<<< Updated upstream
import TestPage from './pages/ProtectedTest'; // Import test
import axios from 'axios';

export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // First thing, check if a refreshtoken exist
  useEffect(() => {
    async function checkRefreshToken() {
      const result = await axios.post('routes/tokens/refresh_token', {
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json',
        }
      })

      setUser({
        accessToken: result.accessToken,
      });
      
      //console.log(result.accessToken);
      setLoading(false);
    }
      checkRefreshToken();
  }, []);

  if (loading) return <div>Loading ...</div>;
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/Signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />  {/* Add Login Route */}
        <Route path='/test' element={<TestPage />} />  {/* Add Protected Test Route */}
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <UserContext.Provider value={[user, setUser]}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
  //return <RouterProvider router={router} />;
}
// const router = (
//   <UserContext.Provider value={[user, setUser]}>
//     <div classname="app">
//       <Navbar logOutCallback={logOutCallback} />
//       <Router id="router">
//         <LoginPage path="/login" />
//         <SignupPage path="/signup" />
//         <MainLayout path="/" />
//         <HomePage index />
//         <NotFoundPage path='*' />
//       </Router>
//     </div>
//   </UserContext.Provider>
// );


//const App = () => {
//  return <RouterProvider router={router} />;
//};
=======
import Dashboard from './pages/Dashboard';  // Import the Dashboard page

// Create the router using `createBrowserRouter` and `createRoutesFromElements`
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />  {/* HomePage at root URL */}
      <Route path='/signup' element={<SignupPage />} />  {/* Signup route */}
      <Route path='/login' element={<LoginPage />} />  {/* Login route */}
      <Route path='/dashboard' element={<Dashboard />} />  {/* Dashboard route */}
      <Route path='*' element={<NotFoundPage />} />  {/* Fallback for non-existent routes */}
    </Route>
  )
);

// Main App component
const App = () => {
  return <RouterProvider router={router} />;  {/* Use RouterProvider to provide the router to the app */}
};
>>>>>>> Stashed changes

export default App;