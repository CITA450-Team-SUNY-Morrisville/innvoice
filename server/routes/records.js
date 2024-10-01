import express from "express";
// Import the records.js file
import userRecords from './userRecords.js';

const router = express.Router();

// Use the imports with ('/subdomain', import);
router.use('/users', userRecords);

export default router;
