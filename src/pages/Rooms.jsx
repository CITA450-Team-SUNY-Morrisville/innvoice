import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';  
import Footer from '../components/Footer';  
import { ThemeContext } from '../ThemeContext'; 
import axios from 'axios';

const Dashboard = () => {
  const { theme } = useContext(ThemeContext); 

  const navigate = useNavigate();  // Hook to navigate between routes

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
      <Navbar />

      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Rooms</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Print room data from database */}
          <button className="p-4 rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all" onClick={
            async (e) => {
              try {
              const response = await axios.get('/routes/rooms');

              if (response.data) {
                console.log("All Rooms:")

                for (var i in response.data) {
                  console.log(response.data[i])
                }
              }

            } catch (err) {
              console.log("Error getting room data: ", err)
            }
            }
          }>
            All Rooms
          </button>

          <button className="p-4 rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all" onClick={
            async (e) => {
              try {
              const response = await axios.get('/routes/rooms');

              if (response.data) {
                console.log("Rooms available reservation:")

                for (var i in response.data) {
                  if (response.data[i].status == 'available') {
                    console.log(response.data[i])
                  }
                }
              }
            } catch (err) {
              console.log("Error getting room data: ", err)
            }
            }
          }>
            Available Rooms
          </button>

          <button className="p-4 rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all" onClick={
            async (e) => {
              try {
              const response = await axios.get('/routes/rooms');

              if (response.data) {
                console.log("Reserved rooms:")

                for (var i in response.data) {
                  if (response.data[i].status == 'occupied') {
                    console.log(response.data[i])
                  }
                }
              }
            } catch (err) {
              console.log("Error getting room data: ", err)
            }
            }
          }>
            Reserved Rooms
          </button>

          <button className="p-4 rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all" onClick={
            async (e) => {
              try {
              const response = await axios.get('/routes/rooms');
              
              if (response.data) {
                console.log("Rooms unavailable due to maintenence or reservation:")

                for (var i in response.data) {
                  if (response.data[i].status == 'occupied' || response.data[i].status == 'maintenance') {
                    console.log(response.data[i])
                  }
                }
              }
            } catch (err) {
              console.log("Error getting room data: ", err)
            }
            }
          }>
            Unavailable Rooms
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
