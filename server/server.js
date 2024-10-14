
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import records from './routes/records.js';
import guestRoutes from './routes/guestRecords.js';
import roomRoutes from './routes/roomRecords.js';
import bookingRoutes from './routes/bookingRecords.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use("/routes", records);
app.use("/routes/guests", guestRoutes);
app.use("/routes/rooms", roomRoutes);
app.use("/routes/bookings", bookingRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
