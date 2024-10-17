
import express from 'express';
const router = express.Router();

// Example route: Get list of rooms
router.get('/', (req, res) => {
  res.send('List of rooms');
});

// Example route: Add a room
router.post('/', (req, res) => {
  const newRoom = req.body; // Assuming new room info is sent in the request body
  res.send(`Room added: ${newRoom.roomNumber}`);
});

export default router;
