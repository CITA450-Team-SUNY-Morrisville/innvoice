import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON

// MySQL connection pool configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,  // Max number of connections in the pool
  queueLimit: 0
});

// POST /signup route - to add a new user
app.post('/signup', async (req, res) => {
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
app.get('/signup', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM signup');
    res.status(200).json(results); // Return all users as JSON
  } catch (err) {
    console.error('Error fetching data from signup table:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
