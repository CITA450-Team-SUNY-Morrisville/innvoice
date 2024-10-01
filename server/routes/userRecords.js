import express from "express";

// This will help us connect to the database
import pool from "../db/connection.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// POST /signup route - to add a new user
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const query = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
      const [results] = await pool.query(query, [username, email, password]);
      res.status(201).json({ message: 'User signed up successfully', userId: results.insertId });
    } catch (err) {
      console.error('Error inserting into signup table:', err);
      res.status(500).json({ message: 'Database error' });
    }
  });
  
  // GET /signup route - to fetch all users
  router.get('/signup', async (req, res) => {
    try {
      const [results] = await pool.query('SELECT * FROM signup');
      res.status(200).json(results); // Return all users as JSON
    } catch (err) {
      console.error('Error fetching data from signup table:', err);
      res.status(500).json({ message: 'Database error' });
    }
  });

export default router;
