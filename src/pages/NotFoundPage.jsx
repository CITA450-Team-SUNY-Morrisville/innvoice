import React from 'react';
import { Link } from 'react-router-dom';  // Used for creating links to other pages
import { FaExclamationTriangle } from 'react-icons/fa';  // Icon for 404 error

// NotFoundPage displays a 404 error message when a page is not found
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="flex flex-col items-center p-8 bg-black rounded-lg shadow-md text-center">
        {/* Display a warning icon */}
        <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
        <h1 className="text-6xl font-bold mb-4">404</h1>  {/* Large 404 title */}
        <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
        {/* Link to go back to the homepage */}
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-full transition duration-200 hover:bg-blue-600">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;