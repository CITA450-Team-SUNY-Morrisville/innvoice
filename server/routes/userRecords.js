import express from "express";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
// Authentication with tokens
import { CreateAccessToken, CreateRefreshToken, SendAccessToken, SendRefreshToken } from '../../src/tokens.js';
import IsAuth from '../../src/isAuth.js';

const saltRounds = 10;
dotenv.config();

// This will connect to the database (REQUIRED!!!!!)
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

    // Salt and hash password.
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    try {
        const query = 'INSERT INTO User (username, email, password) VALUES (?, ?, ?)';
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
        const [results] = await pool.query('SELECT * FROM User');
        res.status(200).json(results); // Return all users as JSON
    } catch (err) {
        console.error('Error fetching data from signup table:', err);
        res.status(500).json({ message: 'Database error' });
    }
 });

  // Login via checking against password returned from username or email.
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = 'SELECT * FROM User WHERE email = ?'
        const [user] = await pool.query(query, [email]);

        var passwordHash;

        // Check if a row was returned
        if (user.length > 0) {
            passwordHash = user[0].password; // Get the 'password' field from the first row
            console.log('Password hash:', passwordHash);
            
        // Compare the passwords.
        if (bcrypt.compare(password, passwordHash)) {
            // Passwords match, authentication successful.
            console.log('Passwords match! User ' + email + ' authenticated.');

            // Do authentication stuff here.
            try {
                const accessToken = CreateAccessToken(user.ID);
                const refreshToken = CreateRefreshToken(user.ID);

                console.log('Access token: ' + accessToken);
                console.log('Refresh token: ' + refreshToken);

                // Add refresh token to database.
                try {
                    const refreshTokenQuery = 'UPDATE User SET refreshToken = ? WHERE email = ?';
                    await pool.query(refreshTokenQuery, [refreshToken, email])
                    console.log('seuccessfully inserted refresh token');
                } catch(err) {
                    console.log('error inserting refresh token: ' + err);
                    // 500: Internal Server Error
                    res.status(500).json({ message: 'Database error' });
                }

                // Send token.
                // Refresh token as a cookie. 
                // Access token as a response.
                SendRefreshToken(res, refreshToken);
                SendAccessToken(res, accessToken);
            } catch (err) {
                console.log('Failed to generate authentication token. Contact Alex ASAP! Error: ' + err);
                // 500: Internal Server Error
                res.status(500).json({ message: 'Failed to generate authentication token. Contact Alex ASAP! Error: ' + err });
            }

            // 200: OK
            res.status(200).json({ message: 'User authenticated.' });

        } else {
            // Passwords don't match, authentication failed. 403 Forbidden
            console.log('Passwords do not match! Authentication failed.');
            // 401: Forbidden
            res.status(401).json({ message: 'Incorrect username or password' });
        }
        // No password from provided email.
        } else {
            console.log('No user found with the provided username or email');
            // 401: Forbidden
            res.status(401).json({ message: 'Incorrect username or password' });
        }

    } catch (err) {
        console.log(err);
        // 500: Internal Server Error
        res.status(500).json({ message: 'Database error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    return res.status(200).json({
        message: 'Logged out'
    })
});

export default router;
