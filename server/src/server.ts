//server/server.ts
import express from 'express';
import dotenv from 'dotenv';
import './config/connection.js';  // Import the connection file to establish the DB connection

dotenv.config();
console.log("MongoDB URI:", process.env.MONGODB_URI); // Debugging line

const app = express();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
