//server/server.ts
import express from 'express';
import dotenv from 'dotenv';
import './config/connection.js';  // Import the connection file to establish the DB connection

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
