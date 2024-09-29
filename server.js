import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON

// MySQL connection configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// POST /signup route - to add a new user
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting into signup table:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'User signed up successfully', userId: results.insertId });
  });
});

// GET /signup route - to fetch all users
app.get('/signup', (req, res) => {
  const query = 'SELECT * FROM signup';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from signup table:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results); // Return all users as JSON
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
