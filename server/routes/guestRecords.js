
import express from 'express';
const router = express.Router();

// Example route: Get list of guests
router.get('/', (req, res) => {
  res.send('List of guests');
});

// Example route: Add a guest
router.post('/', (req, res) => {
  const newGuest = req.body; // Assuming new guest info is sent in the request body
  res.send(`Guest added: ${newGuest.name}`);
});

export default router;
