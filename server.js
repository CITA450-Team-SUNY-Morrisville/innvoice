import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import shell from 'shelljs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database as ID: ' + connection.threadId);
  }
});

app.post('/users', (req, res) => {
  const { email, password } = req.body;
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  connection.query(sql, [email, password], (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: 'User added successfully', data: result });
  });
});

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users'; // Modify this based on your actual table structure
  connection.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);  // Return the list of users as JSON
  });
});

app.get('/github/deploy', () => {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    return;
  }

  if (shell.exec('git pull').code !== 0) {
    shell.echo('Error: Git pull failed');
  }
});

// No point displaying this page
//app.get('/database', function(req, res, next) {
//  res.send("Hello world");
//});

app.listen(5000, () => {
  console.log('Listening on port: ' + 5000);
});