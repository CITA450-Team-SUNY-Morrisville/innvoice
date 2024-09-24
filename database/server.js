const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freelanceclientandinvoice',
});

app.get('/customerlogin', (req, res) => {
  const sql = 'SELECT * FROM customerlogin';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/users', (req, res) => {
  const { email, password } = req.body;
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: 'User added successfully', data: result });
  });
});

app.get('/', (req, res) => {
  return res.json('hello world');
});

app.listen(5000, () => {
  console.log('Listening...');
});