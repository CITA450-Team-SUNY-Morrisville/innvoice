import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// MySQL connection pool configuration
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,  // Max number of connections in the pool
    queueLimit: 0
  });

// Function to check if connection is successful
  (async function() {
    try {
        // Get a connection and check with a query
        const connection = await pool.getConnection();
        await connection.query('SELECT 1');
        console.log('Ping successful, connection is working.');
        
        // Release the connection back to the pool
        connection.release();
    } catch (err) {
        console.error('Error connecting to the database. Contact Jmac ASAP! Error:', err);
    }
})();

export default pool