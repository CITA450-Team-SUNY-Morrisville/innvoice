import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import React from 'react'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/Signup'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path='/Signup' element={<SignupPage />}/>
      <Route path='*' element={<NotFoundPage />}/>
    </Route>
)
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
