import express from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// This will help us connect to the database
import pool from "../db/connection.js";
import cookies from "cookie-parser";


dotenv.config();

// Authentication with tokens
import { CreateAccessToken, CreateRefreshToken, SendAccessToken, SendRefreshToken } from '../../src/tokens.js';

// This will help us connect to the database


// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();
//console.log( localStorage.getItem('accessToken'));
//var token = localStorage.getItem('token');
router.use(cookies());
// 5. Get a new access token with a refresh token
router.post('/refresh_token', async (req, res) => {
    try {
    const token = req.cookies.refreshToken;
    // Debug console log, comment out when doen.
    console.log(`cookies: ${req.cookies.refreshToken}`);
    // If we don't have a token in our request
    if (!token) return res.send({ accessToken: '' });
    // We have a token, let's verify it!
    let payload = null;
    try {
      payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.log('fail verify')
      return res.send({ accessToken: '' });
    }
    // token is valid, check if user exist
    // get userid where refreshtoken exists

    const query = 'SELECT id, refreshToken FROM signup WHERE refreshToken = ?'
    const [rows, fields] = await pool.query(query, [token]);
    // if user doesnt exist.
    if (!rows) return res.send({ accessToken: '' });
    // user exist, check if refreshtoken exist on user
    console.log(rows[0]);
    //console.log(rows[0].refreshToken);
    console.log(token);
    if (rows[0].refreshToken !== token) return res.send({ accessToken: '' });
    // token exist, create new Refresh- and accesstoken
    const accessToken = CreateAccessToken(rows[0].id);
    const newRefreshToken = CreateRefreshToken(rows[0].id);
    console.log(newRefreshToken);
    // update refreshtoken on user in db
    try {
      const refreshTokenQuery = 'UPDATE signup SET refreshToken = ? WHERE id = ?';
      await pool.query(refreshTokenQuery, [newRefreshToken, rows[0].id])
      console.log('seuccessfully inserted refresh token');
    } catch(err) {
      console.log('error inserting refresh token: ' + err);
      // Server error but idk what to return just hope it works
      return res.send({ accessToken: '' });
    }

    // All good to go, send new refreshtoken and accesstoken
    console.log('all good');
    SendRefreshToken(res, newRefreshToken);
    SendAccessToken(res, accessToken);
} catch (err) {
    console.log(err);
    return res.send({ accessToken: '' });
}
  });

export default router;
