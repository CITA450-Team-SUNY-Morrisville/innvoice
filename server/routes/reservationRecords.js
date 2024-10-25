import dotenv from 'dotenv';
import express from 'express';
const router = express.Router();

dotenv.config();

// This will connect to the database (REQUIRED!!!!!)
import pool from "../db/connection.js";

// Example route: Get list of reservation from specific room
router.post('/', async (req, res) => {
  try {
    const roomNumber = req.body.roomNum;
    const query = 'SELECT * FROM Reservation WHERE roomNumber = ?'
    const [results] = await pool.query(query, [roomNumber]);
    res.status(200).json(results); // Return all reservations as JSON
  } catch (err) {
    console.error('Error fetching data from room table:', err);
    res.status(500).json({ message: 'Database error' });
}
});

router.post('/setReservation', async (req, res) => {
  try {
    console.log(req.body)
    const {roomNumber, checkInDate, checkOutDate, numberOfGuest} = req.body;
    const query = 'INSERT INTO Reservation (roomNumber, checkInDate, checkOutDate, numberOfGuest) VALUES (?, ?, ?, ?)'
    const [results] = await pool.query(query, [roomNumber, checkInDate, checkOutDate, numberOfGuest]);
    res.status(200).json(results); // Return results
  } catch (err) {
    console.error('Error fetching data from room table:', err);
    res.status(500).json({ message: 'Database error' });
}
});


export default router;
