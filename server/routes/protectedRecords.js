import express from "express";
import dotenv from 'dotenv';
// Authentication with tokens
import { CreateAccessToken, CreateRefreshToken, SendAccessToken, SendRefreshToken } from '../../src/tokens.js';
import IsAuth from '../../src/isAuth.js';
//import UserContext from '../../src/App.jsx';

dotenv.config();

//const [user, setUser] = useState(UserContext);

// This will help us connect to the database


// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();
//console.log( localStorage.getItem('accessToken'));
//var token = localStorage.getItem('token');

// Add auth header to any protected record
router.all('*' , (req, res, next) => {

    if (!user.accessToken) {
      console.log('token: undefined');
    } else {
      req.headers.authorization = 'Bearer ' + user.accessToken; 
    }
    
    next();
});

// Test protected page
router.post('/test', async (req, res) => {
    try {
        const userID = IsAuth(req);
        if (userID !== null) {
            res.status(200).json({
                data: 'This is protected data.',
                message: 'This is protected data.'
            })
        }
    } catch (err) {
        console.log('Protected test error: ' + err);
        res.status(500).json({ message: err})
    }
});

export default router;
