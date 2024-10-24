import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';  
import Footer from '../components/Footer';  
import { ThemeContext } from '../ThemeContext'; 
import Popup from '../components/Popup';  

const Dashboard = () => {
  const { theme } = useContext(ThemeContext); 
  const [isCheckInOpen, setCheckInOpen] = useState(false); 
  const [isCheckOutOpen, setCheckOutOpen] = useState(false); 
  const [isRoomStatusOpen, setRoomStatusOpen] = useState(false); 
  const [isInnMgmtOpen, setInnMgmtOpen] = useState(false); 
  const [isRoomMgmtFormOpen, setRoomMgmtFormOpen] = useState(false); // Room management form state
  const [isGuestMgmtFormOpen, setGuestMgmtFormOpen] = useState(false); // Guest management form state
  const [isEmployeeMgmtFormOpen, setEmployeeMgmtFormOpen] = useState(false); // Employee management form state
  const navigate = useNavigate();  // Hook to navigate between routes

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
      <Navbar />

      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Check-In Button */}
          <button className="p-4 rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all" onClick={() => setCheckInOpen(true)}>
            Check-In
          </button>

          {/* Check-Out Button */}
          <button className="p-4 rounded-lg shadow-lg bg-green-600 text-white hover:bg-green-700 transition-all" onClick={() => setCheckOutOpen(true)}>
            Check-Out
          </button>

          {/* Room Status Button */}
          <button className="p-4 rounded-lg shadow-lg bg-red-600 text-white hover:bg-red-700 transition-all" onClick={() => setRoomStatusOpen(true)}>
            Room Status
          </button>

          {/* Inn Management Button */}
          <button className="p-4 rounded-lg shadow-lg bg-yellow-600 text-white hover:bg-yellow-700 transition-all" onClick={() => setInnMgmtOpen(true)}>
            Inn Management
          </button>

          {/* Reservation page redirect */}
          <button className="p-4 rounded-lg shadow-lg bg-yellow-600 text-white hover:bg-purple-700 transition-all" onClick={() => navigate("/reservations")}>
            Reservations
          </button>
        </div>
      </div>

      {/* Check-In Popup */}
      <Popup isOpen={isCheckInOpen} onClose={() => setCheckInOpen(false)} title="Check-In Form" theme={theme}>
        <form className="space-y-4">
          <label className="block text-lg">Guest Name:</label>
          <input type="text" className="border p-2 mb-4 w-full" placeholder="Enter guest name" />
          <label className="block text-lg">Room Number:</label>
          <input type="text" className="border p-2 mb-4 w-full" placeholder="Enter room number" />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg w-full">Submit</button>
        </form>
      </Popup>

      {/* Check-Out Popup */}
      <Popup isOpen={isCheckOutOpen} onClose={() => setCheckOutOpen(false)} title="Check-Out Form" theme={theme}>
        <form className="space-y-4">
          <label className="block text-lg">Guest Name:</label>
          <input type="text" className="border p-2 mb-4 w-full" placeholder="Enter guest name" />
          <label className="block text-lg">Room Number:</label>
          <input type="text" className="border p-2 mb-4 w-full" placeholder="Enter room number" />
          <button type="submit" className="bg-green-600 text-white p-2 rounded-lg w-full">Submit</button>
        </form>
      </Popup>

      {/* Room Status Popup */}
      <Popup isOpen={isRoomStatusOpen} onClose={() => setRoomStatusOpen(false)} title="Room Status" theme={theme}>
        <form className="space-y-4">
          <label className="block text-lg">Room Number:</label>
          <input type="text" className="border p-2 mb-4 w-full" placeholder="Enter room number" />
          <label className="block text-lg">Status:</label>
          <select className="border p-2 mb-4 w-full">
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <button type="submit" className="bg-red-600 text-white p-2 rounded-lg w-full">Submit</button>
        </form>
      </Popup>

      {/* Inn Management Popup */}
      <Popup isOpen={isInnMgmtOpen} onClose={() => setInnMgmtOpen(false)} title="Inn Management" theme={theme}>
        <div className="space-y-4">
          {/* Room Management Button */}
          <button className="p-4 rounded-lg shadow-lg bg-yellow-600 text-white hover:bg-yellow-700 transition-all w-full" onClick={() => setRoomMgmtFormOpen(true)}>
            Room Management
          </button>

          {/* Guest Management Button */}
          <button className="p-4 rounded-lg shadow-lg bg-purple-600 text-white hover:bg-purple-700 transition-all w-full" onClick={() => setGuestMgmtFormOpen(true)}>
            Guest Management
          </button>

          {/* Employee Management Button */}
          <button className="p-4 rounded-lg shadow-lg bg-orange-600 text-white hover:bg-orange-700 transition-all w-full" onClick={() => setEmployeeMgmtFormOpen(true)}>
            Employee Management
          </button>
        </div>
      </Popup>

      {/* Room Management Popup */}
      <Popup isOpen={isRoomMgmtFormOpen} onClose={() => setRoomMgmtFormOpen(false)} title="Room Management" theme={theme}>
        <form className="space-y-4">
          <label className="block text-lg">Room Number:</label>
          <input type="text" className="border p-2 mb-4 w-full" placeholder="Enter room number" />
          <label className="block text-lg">Nightly Rate Code:</label>
          <input type="text" className="border p-2 mb-4 w-full" placeholder="Enter nightly rate code" />
          <label className="block text-lg">Action:</label>
          <select className="border p-2 mb-4 w-full">
            <option value="add">Add Room</option>
            <option value="update">Update Room</option>
            <option value="delete">Delete Room</option>
          </select>
          <button type="submit" className="bg-yellow-600 text-white p-2 rounded-lg w-full">Submit</button>
        </form>
      </Popup>

      {/* Guest Management Popup */}
      <Popup isOpen={isGuestMgmtFormOpen} onClose={() => setGuestMgmtFormOpen(false)} title="Guest Management" theme={theme}>
        <form className="space-y-4">
          <label className="block text-lg">Guest Name:</label>
          <input type="text" className="border p-2 mb-4 w-full" placeholder="Enter guest name" />
          <label className="block text-lg">Phone Number:</label>
          <input type="text" className="border p-2 mb-4 w-full" placeholder="Enter phone number" />
          <button type="submit" className="bg-purple-600 text-white p-2 rounded-lg w-full">Submit</button>
        </form>
      </Popup>

      {/* Employee Management Popup */}
      <Popup isOpen={isEmployeeMgmtFormOpen} onClose={() => setEmployeeMgmtFormOpen(false)} title="Employee Management" theme={theme}>
        <form className="space-y-4">
          <label className="block text-lg">Employee Name:</label>
          <input type="text" className="border p-2 mb-4 w-full" placeholder="Enter employee name" />
          <label className="block text-lg">Email:</label>
          <input type="text" className="border p-2 mb-4 w-full" placeholder="Enter employee email" />
          <label className="block text-lg">Role:</label>
          <select className="border p-2 mb-4 w-full">
            <option value="front_desk">Front Desk</option>
            <option value="housekeeping">Housekeeping</option>
            <option value="manager">Manager</option>
          </select>
          <button type="submit" className="bg-orange-600 text-white p-2 rounded-lg w-full">Submit</button>
        </form>
      </Popup>

      <Footer />
    </div>
  );
}

export default Dashboard;
