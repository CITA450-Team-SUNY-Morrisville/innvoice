import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', async (req, res) => {
  try {
    const url = `https://auth-db1626.hstgr.io/index.php?route=/sql&pos=0&db=u975527283_Freelancer&table=`;
    const response = await axios({
      method: req.method,
      url,
      headers: { ...req.headers },  // Forward headers from the client
      data: req.body,  // Forward the request body
    });
    res.json(response.data);
  } catch (err) {
    console.error('Error in proxy:', err.message);
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});


const db = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database.');
  }
});

app.post('/users', (req, res) => {
  const { email, password } = req.body;
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: 'User added successfully', data: result });
  });
});

app.get('/database/users', (req, res) => {
  const sql = 'SELECT * FROM users'; // Modify this based on your actual table structure
  db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);  // Return the list of users as JSON
  });
});

app.get('/database', function(req, res, next) {
  res.send("Hello world");
});

app.listen(8080, () => {
  console.log('Listening...');
});