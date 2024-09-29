// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connectToDatabase = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
};

// Route to get data from the signup table
app.get('/signup', async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM signup');
    connection.end();

    res.status(200).json(rows);  // Return the rows as JSON
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for user signup (inserts data into the database)
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const connection = await connectToDatabase();
    const query = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
    await connection.execute(query, [username, email, password]);

    connection.end();
    res.status(201).json({ message: 'User signed up successfully!' });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
