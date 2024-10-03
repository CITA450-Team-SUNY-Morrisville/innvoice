import express from "express";
import dotenv from 'dotenv';

import cookies from "cookie-parser";

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
router.post('/refresh_token', (req, res) => {
    try {
    const token = req.cookies.refreshToken;
    console.log(`cookies: ${req.cookies.refreshToken}`);
    // If we don't have a token in our request
    if (!token) return res.send({ accessToken: '' });
    // We have a token, let's verify it!
    let payload = null;
    try {``
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.send({ accessToken: '' });
    }
    // token is valid, check if user exist
    // const user = fakeDB.find(user => user.id === payload.userID);
    //if (!user) return res.send({ accessToken: '' });
    // user exist, check if refreshtoken exist on user
    //if (user.refreshtoken !== token)
    //  return res.send({ accessToken: '' });
    // token exist, create new Refresh- and accesstoken
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);
    // update refreshtoken on user in db
    // Could have different versions instead!
    //user.refreshToken = refreshToken;
    // All good to go, send new refreshtoken and accesstoken
    sendRefreshToken(res, refreshToken);
    //console.log('all good');
    return res.send({ accessToken });
} catch (err) {
    console.log(err);
    return res.send({ accessToken: '' });
}
  });

export default router;
