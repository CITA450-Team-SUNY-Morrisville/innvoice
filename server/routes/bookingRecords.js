
import express from 'express';
const router = express.Router();

// Example route: Get list of bookings
router.get('/', (req, res) => {
  res.send('List of bookings');
});

// Example route: Add a booking
router.post('/', (req, res) => {
  const newBooking = req.body; // Assuming new booking info is sent in the request body
  res.send(`Booking added for guest: ${newBooking.guestName}`);
});

export default router;
