
import express from "express";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
// Authentication with tokens
import { CreateAccessToken, CreateRefreshToken, SendAccessToken, SendRefreshToken } from '../../src/tokens.js';
import IsAuth from '../../src/isAuth.js';  // Middleware for checking token validity

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

    try {
        // Check if a user with the same email or username already exists
        const [existingUser] = await pool.query('SELECT * FROM User WHERE email = ? OR username = ?', [email, username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        // Salt and hash password.
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const query = 'INSERT INTO User (username, email, password) VALUES (?, ?, ?)';
        // use hash instead of password
        const [results] = await pool.query(query, [username, email, hash]);
        res.status(201).json({ message: 'User signed up successfully', userId: results.insertId });
    } catch (err) {
        console.error('Error inserting into signup table:', err);
        res.status(500).json({ message: 'Database error' });
    }
});
  
// POST /login route - to authenticate user and generate tokens
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = 'SELECT * FROM User WHERE email = ?'
        const [user] = await pool.query(query, [email]);

        var passwordHash;

        // Check if a row was returned
        if (user.length > 0) {
            passwordHash = user[0].password; // Get the 'password' field from the first row
            
        // Compare the passwords.
        if (await bcrypt.compare(password, passwordHash)) {
            // Passwords match, authentication successful.

            // Create access and refresh tokens for the authenticated user
            const accessToken = CreateAccessToken(user[0].id);
            const refreshToken = CreateRefreshToken(user[0].id);

            // Store refresh token in the database
            const refreshTokenQuery = 'UPDATE User SET refreshToken = ? WHERE email = ?';
            await pool.query(refreshTokenQuery, [refreshToken, email]);

            // Send the tokens to the user
            SendRefreshToken(res, refreshToken);  // Set refresh token as cookie
            SendAccessToken(res, accessToken);    // Send access token in the response

            // Respond with success message
            return res.status(200).json({ message: 'User authenticated.', accessToken });

        } else {
            // Passwords don't match, authentication failed.
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
        } else {
            // No user found with the provided email
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

    } catch (err) {
        console.log('Login error:', err);
        return res.status(500).json({ message: 'Database error' });
    }
});

// POST /logout route - clear tokens and log out user
router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    return res.status(200).json({
        message: 'Logged out'
    })
});

// GET /records - fetch all users (existing route)
router.get('/records', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM User');
        res.status(200).json(results); // Return all users as JSON
    } catch (err) {
        console.error('Error fetching data from signup table:', err);
        res.status(500).json({ message: 'Database error' });
    }
});

// Example protected route: Only accessible if the user is authenticated
// Added IsAuth middleware to protect this route
router.get('/protected', IsAuth, async (req, res) => {
    try {
        res.status(200).json({ message: 'Access granted to protected resource.' });
    } catch (err) {
        console.error('Error accessing protected route:', err);
        res.status(500).json({ message: 'Error accessing protected resource.' });
    }
});

export default router;
