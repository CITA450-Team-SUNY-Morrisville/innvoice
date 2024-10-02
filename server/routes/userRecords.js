import express from "express";
import bcrypt from 'bcrypt';

const saltRounds = 10;
var hashedPass;

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

    // bcrypt.genSalt(saltRounds, (err, salt) => {
    //     if (err) {
    //         // Handle error
    //         console.log("Error generating password salting");
    //         return;
    //     }
    //     bcrypt.hash('password', salt, (err, hash) => {
    //         if (err) {
    //             // Handle error.
    //             console.log("password hash failed, contact Alex asap");
    //             res.status(500).json({ message: 'Password hashing failed' });
    //             return;
    //         }

    //     });

        try {
            const query = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
            // use hash instead of password
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

  // Login via checking against password returned from username or email.
  router.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const query = 'SELECT password WHERE username = ? OR email = ?'
        const [rows] = await pool.query(query, [username, email]);

        // Compare the passwords.
        bcrypt.compare(password, rows.map((rows) => { return rows.password }), (err, result) => {
            if (err) {
                // Handle error
                console.error('Error comparing passwords: ', err);
                res.status(500).json({ message: 'Error comparing passwords, please try again later.' });
                return;
            }
        
        if (result) {
            // Passwords match, authentication successful

            // Do authentication stuff here.
            // maybe soemthing with the response to show it beign done and to run code on a login.jsx for instance.
            // Autually do stuff with cookies or tokens

            console.log('Passwords match! User ' + username + ':' + email + ' authenticated.');
        } else {
            // Passwords don't match, authentication failed. 403 Forbidden
            res.status(403).json({ message: 'Incorrect username or password' });
            //console.log('Passwords do not match! Authentication failed.');
        }
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'Incorrect username or password / database error' });
    }
  });

export default router;
