// server/config/connection.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load enviro vars
dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/billbuddies';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connection established successfully'))
    .catch(err => {
      console.error('MongoDB connection error details:', err); 
    });
  
  export default mongoose.connection;
  
  
  
  
  
  
  
  
  
  