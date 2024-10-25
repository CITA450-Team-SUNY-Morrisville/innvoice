import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';  
import Footer from '../components/Footer';  
import Checkbox from '../components/Checkbox';
import NumberPicker from '../components/NumberPicker';
import { ThemeContext } from '../ThemeContext'; 
import axios from 'axios';
import roomIcon from '../assets/images/roomicon.png'; // Import the room icon

import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";

import RoomNumberDropdown from '../components/RoomNumberDropDown';

const Reservations = () => {
  const { theme } = useContext(ThemeContext); // Access current theme (dark or light mode)

  // State for dateTime
  const [checkInDateTime, setCheckInDateTime] = useState(Date.now())
  // Doing a bunch of math because the addition is in miliseconds, 2 days from now
  const [checkOutDateTime, setCheckOutDateTime] = useState(new Date(Date.now() + 48 * 60 * 60 * 1000))

  // State for dropdown
  const [rooms, setRooms] = useState([]); // State to store room data fetched from the API
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // State for reservation messages
  const [reservationMessages, setReservationMessages] = useState([]);

  // State for number picker
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const handleRoomSelect = async (room) => {
    setSelectedRoom(room); // Save the selected room
    setReservationMessages([]); // Clear previous messages

    const todayDate = Date.now();
    const reservationDates = await GetDatesOfReservations(room.roomNumber);
    console.log(reservationDates);
    const messages = []; // Array to hold messages for rendering

    // Todays date to show current or future reservations, will specify a date in a calander otherwise
    // We dont need thi at all, if its not ongoing and not in the future we just dont render it
    // It is still useful to have the function as we dont want to be able to schedule a date in the past
    // and we also want to delete any really old reservations
    for (var i in reservationDates) {
        const reservation = reservationDates[i];
            
        // Convert the check-in and check-out dates from UTC to EST as MYSQL stores dates as UST
        // For some reason its making the date as if its from paris: 4 hour ahead of EST
        const checkInEST = format(toZonedTime(new Date(reservation.checkInDate), 'America/New_York'), 'Pp');
        const checkOutEST = format(toZonedTime(new Date(reservation.checkOutDate), 'America/New_York'), 'Pp');


        // Past reservations
        if (isDateAfterDate(todayDate, reservation.checkOutDate)) {
            continue;
        }

        // Present reservation
        if (isDateInRange(todayDate, reservation.checkInDate, reservation.checkOutDate)) {
            messages.push({
                text: `Ongoing reservation: ${reservation.reservationId} - Start date: ${checkInEST}, End date: ${checkOutEST}`,
                date: reservation.checkInDate // Include the date for sorting
            });
            continue;
        }

        // Future reservations
        if (isDateBeforeDate(todayDate, reservation.checkInDate)) {
            messages.push({
                text: `Future reservation: ${reservation.reservationId} - Start date: ${checkInEST}, End date: ${checkOutEST}`,
                date: reservation.checkInDate // Include the date for sorting
            });
            continue;
        }
    }


    // Can also sort by other criteria if added like end date
    // Sort messages by date in ascending order
    messages.sort((a, b) => new Date(a.date) - new Date(b.date));


    // Extract only text for rendering and set the state
    setReservationMessages(messages.map(message => message.text)); // Extract only text for rendering
  };

  const [loading, setLoading] = useState(false); // State to manage loading

  // Function to fetch room data and apply filters
  const FetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/routes/rooms'); // Replace with actual API route

      if (response.data) {
        return response.data
      }
    } catch (err) {
      console.log("Error fetching room data:", err);
    } finally {
      setLoading(false);
    }
  };

  const FetchRoomNumbers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/routes/rooms'); // Replace with actual API route

      if (response.data) {
        const roomNums = []
        for (var i in response.data) {
            roomNums.push(response.data[i].roomNumber)
        }
        console.log(roomNums)
        return roomNums
      }
    } catch (err) {
      console.log("Error fetching room data:", err);
    } finally {
      setLoading(false);
    }
  };

  const isDateInRange = (date, startDate, endDate) => {
        // Convert dates to timestamps for comparison
        const targetTime = new Date(date).getTime();
        const startTime = new Date(startDate).getTime();
        const endTime = new Date(endDate).getTime();

        // Check if targetTime is within the range
        return targetTime >= startTime && targetTime <= endTime;
    }

    // Function that sees if a date is before another beginning date
    const isDateBeforeDate = (date, targetDate) => {
        // Convert dates to timestamps for comparison
        const dateTime = new Date(date).getTime();
        const targetTime = new Date(targetDate).getTime();

        // Check if targetTime is within the range
        return date < targetTime;
    }

        // Function that sees if a date is after end date
    const isDateAfterDate = (date, targetDate) => {
        // Convert dates to timestamps for comparison
        const dateTime = new Date(date).getTime();
        const targetTime = new Date(targetDate).getTime();
    
        // Check if targetTime is within the range
        return date > targetTime;
    }

    const GetDatesOfReservations = async (roomNum) => {
        setLoading(true);
        try {
            const response = await axios.post('/routes/reservations', { roomNum }); // Replace with actual API route
    
          if (response.data) {
            return response.data
          }
        } catch (err) {
          console.log("Error fetching reservation data:", err);
        } finally {
          setLoading(false);
        }
    }
    
    const SetNewReservation = async (roomNumber, checkInDate, checkOutDate, numberOfGuest) => {
        setLoading(true);
        try {
            // Convert dates to UTC as this is how MYSQL stores dates
            //const checkInUTC = new Date(checkInDate).toISOString();
            //const checkOutUTC = new Date(checkOutDate).toISOString();

            //console.log(checkInUTC);
            //console.log(checkOutUTC);


            const response = await axios.post('/routes/reservations/setReservation', { roomNumber, checkInDate, checkOutDate, numberOfGuest }); // Replace with actual API route
            // Do something to give a response back
            return response
        } catch (err) {
          console.log("Error setting new reservation data:", err);
        } finally {
          setLoading(false);
        }
    }

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col`}>
      <Navbar />

      <div className="container mx-auto p-6 flex-grow">
            <h1 className="text-3xl font-bold mb-6">Rooms</h1>
            <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} flex flex-col gap-2 p-4`} style={{ maxHeight: 'fit-content' }}>

            <RoomNumberDropdown 
                label="Select Room"
                setIsDropdownOpen={setIsDropdownOpen}
                isDropdownOpen={isDropdownOpen}
                onSelect={handleRoomSelect} // Pass the selection handler
            />    

            {/* Render reservation messages here */}
            <div className="mt-2">
                {reservationMessages.length > 0 ? reservationMessages.map((message, index) => (
                    <p key={index} className="text-sm text-gray-700">{message}</p>
                )) : <p className="text-sm text-gray-500">No reservations found.</p>}
            </div>

            <p>Check in date</p>
            <Flatpickr
                data-enable-time
                options={
                    { 
                        time_24hr: false ,
                        minDate: Date.now()
                    }
                }
                value={checkInDateTime}
                onChange={setCheckInDateTime}
            />

            <p>Check out date</p>
            {/* TODO: learn how to disable dates in flatpickr and disable any dates returned from getting data for this room */}
            <Flatpickr
                data-enable-time
                options={
                    { 
                        time_24hr: false ,
                        minDate: new Date(checkInDateTime)
                        
                    }
                }
                value={checkOutDateTime}
                onChange={setCheckOutDateTime}
            />  

            {/* This is here because it might be crazy to have more than this, i already think this is way too many, MAYBE its okay with 2 beds */}
            <p>Hotel policy, only 6 guests per room</p>
            <NumberPicker
                label="Number of Guests"
                min={1}
                max={6}
                initialValue={numberOfGuests}
                onChange={setNumberOfGuests} // Update state when the number changes
            />
        </div>
        <button
            className="p-4 rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
            onClick={async () => {
                const todayDate = Date.now();
                
                const rooms = await FetchRoomNumbers()

                console.log(rooms)

                for (var j in rooms)
                {
                    const room = rooms[j];
                    const reservationDates = await GetDatesOfReservations(room);

                    // Todays date to show current or future reservations, will specify a date in a calander otherwise
                    // We dont need thi at all, if its not ongoing and not in the future we just dont render it
                    // It is still useful to have the function as we dont want to be able to schedule a date in the past
                    // and we also want to delete any really old reservations
                    console.log(room);
                    for (var i in reservationDates) {
                        const reservation = reservationDates[i];
                        
                        if (isDateAfterDate(todayDate, reservation.checkOutDate)) {
                            console.log('reservation with ID: ' + reservation.reservationId + ' Has already passed')
                        }
                    }

                    console.log('Ongoing reservations.')
                    for (var i in reservationDates) {
                        const reservation = reservationDates[i];
                        
                        console.log(isDateInRange(todayDate, reservation.checkInDate, reservation.checkOutDate) ? "Reservation ID:" + reservation.reservationId : '')
                    }

                    console.log('Reservations in the future.')
                    for (var i in reservationDates) {
                        const reservation = reservationDates[i];
                        
                        console.log(isDateBeforeDate(todayDate, reservation.checkInDate) ? "Reservation ID:" + reservation.reservationId : '')
                    }
                    //const canReserve = isDateAfterDate(todayDate, endDate);


                }
            }}
        >
            Test get from database
        </button>

        <button
            className="p-4 rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
            onClick={async () => {
                // Page should be cleared after setting this reservation
                if (!isDateBeforeDate(checkOutDateTime, checkInDateTime)) {
                    const existingReservations = await GetDatesOfReservations(selectedRoom.roomNumber);

                    var isValidDate = true
                    for (var i in existingReservations) {
                        const reservation = existingReservations[i];
                        // If the start date isnt in range and the end date isnt in range we can make this reservation

                    
                        if (isDateInRange(checkInDateTime, reservation.checkInDate, reservation.checkOutDate)) {
                            // Show errors to user
                            console.log("Start date in range of other reservation with ID: " + reservation.reservationId);
                            isValidDate = false;
                        }

                        if (isDateInRange(checkOutDateTime, reservation.checkInDate, reservation.checkOutDate)) {
                           console.log("End date in range of other reservation with ID: " + reservation.reservationId);
                           isValidDate = false;
                        }

                    }

                    if (isValidDate) {
                        // Temp hardcoded room num and guest num
                        const response = await SetNewReservation(selectedRoom.roomNumber, checkInDateTime, checkOutDateTime, numberOfGuests)
                        console.log(response); 
                    }

                    else {
                        // Say something idk, might remove this
                    }
                }
                else {
                    // Impossible configuration, show error to user.
                    console.log("Check out is before check in")
                }
            }}
        >
            Test add to database
        </button>

        </div>
      <Footer />
      </div>
  );
};

export default Reservations;