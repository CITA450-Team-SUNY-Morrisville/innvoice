import express from "express";
import bcrypt from 'bcrypt';
// Authentication with tokens
import jwt from 'jsonwebtoken';

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

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    //, (err, salt));
    //  => {
    //     if (err) {
    //         // Handle error
    //         console.log("Error generating password salting");
    //         return;
    //     }
    // });

    //const hash = await bcrypt.hash('password', salt)
    //, (err, hash));
    //  => {
    //     if (err) {
    //         // Handle error.
    //         console.log("password hash failed, contact Alex asap");
    //         res.status(500).json({ message: 'Password hashing failed' });
    //         return;
    //     }
    // });

    console.log('fuck you jmac!!!!!!!!!!');

    try {
        const query = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
        // use hash instead of password
        const [results] = await pool.query(query, [username, email, hash]);
        res.status(201).json({ message: 'User signed up successfully', userId: results.insertId });
    } catch (err) {
        console.error('Error inserting into signup table:', err);
        res.status(500).json({ message: 'Database error' });
    }
});
  
  // GET /signup route - to fetch all users
  router.get('/records', async (req, res) => {
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
        const query = 'SELECT password FROM signup WHERE username = ? OR email = ?'
        const [rows] = await pool.query(query, [username, email]);

        var passwordHash;

        // Check if a row was returned
        if (rows.length > 0) {
            passwordHash = rows[0].password; // Get the 'password' field from the first row
            console.log('Password hash:', passwordHash);

            // Use passwordHash for further processing, such as verifying the password
        } else {
            console.log('No user found with the provided username or email');
        }

        // Compare the passwords.
        if (await bcrypt.compare(password, passwordHash)) {
            // Passwords match, authentication successful

            // Do authentication stuff here
            // Do stuff with cookies or tokens

            console.log('Passwords match! User ' + username + ':' + email + ' authenticated.');
            } else {
            // Passwords don't match, authentication failed. 403 Forbidden
            res.status(403).json({ message: 'Incorrect username or password' });
            console.log('Passwords do not match! Authentication failed.');
            }

    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'Incorrect username or password / database error' });
    }
  });

export default router;
