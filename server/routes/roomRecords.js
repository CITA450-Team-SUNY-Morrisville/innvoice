import dotenv from 'dotenv';
import express from 'express';
const router = express.Router();

dotenv.config();

// This will connect to the database (REQUIRED!!!!!)
import pool from "../db/connection.js";

// Example route: Get list of rooms
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM Room');
    res.status(200).json(results); // Return all users as JSON
  } catch (err) {
    console.error('Error fetching data from room table:', err);
    res.status(500).json({ message: 'Database error' });
}
  //res.send('List of rooms');
});

// Example route: Add a room
router.post('/', async (req, res) => {
  const newRoom = req.body; // Assuming new room info is sent in the request body
  res.send(`Room added: ${newRoom.roomNumber}`);
});

export default router;
