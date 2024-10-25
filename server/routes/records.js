import express from "express";
// Import the records.js file
import userRecords from './userRecords.js';
import protectedRecords from './protectedRecords.js';
import tokenRecords from './tokenRecords.js';
import guestRoutes from './guestRecords.js';
import roomRoutes from './roomRecords.js';
import reservationRoutes from './reservationRecords.js'
import bookingRoutes from './bookingRecords.js';

const router = express.Router();

// Use the imports with ('/subdomain', import);
router.use('/users', userRecords);
router.use('/tokens', tokenRecords);
router.use('/protected', protectedRecords);
router.use("/guests", guestRoutes);
router.use("/rooms", roomRoutes);
router.use("/reservations", reservationRoutes)
router.use("/bookings", bookingRoutes);

export default router;
