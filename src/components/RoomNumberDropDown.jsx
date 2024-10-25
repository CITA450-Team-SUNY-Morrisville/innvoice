import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import axios from 'axios';

const Dropdown = ({ label, setIsDropdownOpen, isDropdownOpen, onSelect }) => {
  const [array, setArray] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Set to true to indicate data fetching
  const [selectedRoom, setSelectedRoom] = useState(null); // Store selected room

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchRoomNumbers(); // Fetch room numbers
        setArray(response); // Update the array after fetching
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Mark as not loading anymore
      }
    };

    fetchData(); // Call the fetchData function inside useEffect
  }, []); // Empty dependency array ensures it runs only on mount

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown open/close state
  };

  const handleSelect = (item) => {
    setSelectedRoom(item.roomNumber); // Update selected room
    if (onSelect) {
      onSelect(item); // Call the onSelect function with the selected item
    }
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const FetchRoomNumbers = async () => {
    try {
      const response = await axios.get('/routes/rooms'); // Replace with actual API route

      if (response.data) {
        const roomNums = response.data.map((room) => ({
          id: room.id, // Assuming 'id' field exists
          roomNumber: room.roomNumber // Only store roomNumber
        }));

        console.log(roomNums);
        return roomNums; // Return the mapped array
      }
    } catch (err) {
      console.log('Error fetching room data:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div>
      <label className="mt-4">{label}</label>

      <button
        className="px-4 w-full py-2 flex items-center justify-between rounded border border-[#828FA340] hover:border-primary cursor-pointer relative"
        onClick={toggleDropdown}
      >
        <span className="block">
          <FaChevronDown color="#635FC7" size={24} />
        </span>
        <span className="ml-2">{selectedRoom || 'Select a room'}</span> {/* Show selected room or prompt */}
      </button>

      {isDropdownOpen && (
        <div className="absolute mt-1 w-[50%] max-w-full rounded bg-[#20212c]">

          <ul className="flex flex-col p-2">
            {array.map((item, index) => (
              <li
                key={index} // Use index or item.id if available
                className="flex items-center gap-2 p-4 hover:bg-[#2b2c37] rounded transition-all duration-200 cursor-pointer"
                onClick={() => handleSelect(item)} // Handle item selection
              >
                <span>{item.roomNumber}</span> {/* Display room number only */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
