import React from 'react';
import Navbar from '../components/Navbar';  // Import the Navbar component to use at the top of the page

// Dashboard component serves as the main page for employees to manage operations
const Dashboard = () => {
  return (
    <>
      <Navbar />  {/* Navbar at the top to allow navigation to other pages */}
      
      {/* Main container for the dashboard content */}
      <div className="container mx-auto p-6">  {/* Applies padding and centers the content */}
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>  {/* Main title of the dashboard */}
        
        {/* Using a grid layout to organize dashboard sections. 
            On small screens, 1 column; on medium (md) and larger screens, 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* First Section: Room Status */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">  {/* Box for Room Status section */}
            <h2 className="text-xl font-semibold">Room Status</h2>  {/* Subheading for Room Status */}
            {/* Placeholder: Room status details will go here */}
          </div>
          
          {/* Second Section: Guest List */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">  {/* Box for Guest list */}
            <h2 className="text-xl font-semibold">Guests</h2>  {/* Subheading for Guests */}
            {/* Placeholder: Guest list or details will go here */}
          </div>
          
          {/* Third Section: Cleaning Schedule */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">  {/* Box for Cleaning Schedule section */}
            <h2 className="text-xl font-semibold">Cleaning Schedule</h2>  {/* Subheading for Cleaning Schedule */}
            {/* Placeholder: Cleaning schedule or tasks will go here */}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Dashboard;