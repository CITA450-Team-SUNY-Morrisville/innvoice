import { useNavigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';  
import Footer from '../components/Footer';  
import Checkbox from '../components/Checkbox';
import { ThemeContext } from '../ThemeContext'; 
import axios from 'axios';
import roomIcon from '../assets/images/roomicon.png'; // Import the room icon

const Rooms = () => {
  const { theme } = useContext(ThemeContext); // Access current theme (dark or light mode)
  const navigate = useNavigate();

  // State for checkboxes to filter room data
  const [checkedAvailable, setCheckedAvailable] = useState(true);
  const [checkedReserved, setCheckedReserved] = useState(true);
  const [checkedMaintanance, setCheckedMaintanance] = useState(true);
  const [checkedNormal, setCheckedNormal] = useState(true);
  const [checkedSuite, setCheckedSuite] = useState(true);

  // State to store filtered room data
  const [rooms, setRooms] = useState([]); // State to store room data fetched from the API
  const [loading, setLoading] = useState(false); // State to manage loading

  // Handle checkbox state changes
  const handleChangeAvailable = () => setCheckedAvailable(!checkedAvailable);
  const handleChangeReserved = () => setCheckedReserved(!checkedReserved);
  const handleChangeMaintanance = () => setCheckedMaintanance(!checkedMaintanance);
  const handleChangeNormal = () => setCheckedNormal(!checkedNormal);
  const handleChangeSuite = () => setCheckedSuite(!checkedSuite);

  // Function to fetch room data and apply filters
  const fetchAndFilterRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/routes/rooms'); // Replace with actual API route

      if (response.data) {
        const filteredRooms = response.data.filter((room) => {
          let matchesType = false;
          let matchesStatus = false;

          // Filter by room type (Normal or Suite)
          if (checkedNormal && ['R100', 'R150', 'R200'].includes(room.roomTypeCode)) matchesType = true;
          if (checkedSuite && ['R200S', 'R300S', 'R400S'].includes(room.roomTypeCode)) matchesType = true;

          // Filter by room availability (Available, Reserved, or Maintenance)
          if (checkedAvailable && room.status === 'available') matchesStatus = true;
          if (checkedReserved && room.status === 'occupied') matchesStatus = true;
          if (checkedMaintanance && room.status === 'maintenance') matchesStatus = true;

          return matchesType && matchesStatus;
        });

        setRooms(filteredRooms);
      }
    } catch (err) {
      console.log("Error fetching room data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
      <Navbar />

      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Rooms</h1>

        {/* Search Filter Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h3 className="text-2xl font-bold mb-4">Search Options</h3>
            <p className="text-lg font-semibold mb-2">Room Availability</p>
            {/* Availability Checkboxes */}
            <Checkbox label="Available" value={checkedAvailable} onChange={handleChangeAvailable} />
            <Checkbox label="Reserved" value={checkedReserved} onChange={handleChangeReserved} />
            <Checkbox label="Maintenance" value={checkedMaintanance} onChange={handleChangeMaintanance} />

            <p className="text-lg font-semibold mt-4 mb-2">Room Type</p>
            {/* Room Type Checkboxes */}
            <Checkbox label="Normal" value={checkedNormal} onChange={handleChangeNormal} />
            <Checkbox label="Suite" value={checkedSuite} onChange={handleChangeSuite} />
          </div>

          {/* Search Button */}
          <div className="col-span-2 flex justify-center">
            <button
              className="p-4 rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
              onClick={fetchAndFilterRooms}
            >
              Search Rooms
            </button>
          </div>
        </div>

        {/* Room Display Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <p>Loading rooms...</p> // Show loading state
          ) : rooms.length > 0 ? (
            rooms.map((room, index) => (
              <div key={index} className="flex items-center border p-4 rounded-lg shadow-lg">
                <img src={roomIcon} alt="Room Icon" className="w-16 h-16 mr-4" /> {/* Room Icon */}
                <div className="flex-grow">
                  <p className="text-xl font-bold">Room: {room.roomNumber}</p>
                  <p>Status: {room.status.charAt(0).toUpperCase() + room.status.slice(1)}</p>
                  <p>
                    Available: {room.status === 'available' ? <span className="text-green-600">(Green Light)</span> : <span className="text-red-600">(Unavailable)</span>}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No rooms match the selected criteria.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Rooms;