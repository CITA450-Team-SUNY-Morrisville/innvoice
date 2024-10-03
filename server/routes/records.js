import express from "express";
// Import the records.js file
import userRecords from './userRecords.js';
import protectedRecords from './protectedRecords.js';
import tokenRecords from './tokenRecords.js';

const router = express.Router();

// Use the imports with ('/subdomain', import);
router.use('/users', userRecords);
router.use('/tokens', tokenRecords);
router.use('/protected', protectedRecords);

export default router;
