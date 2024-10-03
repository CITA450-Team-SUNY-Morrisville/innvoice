import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';  // Import Login
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

export default App;