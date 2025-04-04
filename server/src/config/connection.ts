// server/config/connection.ts
import mongoose from 'mongoose';


const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/billbuddies';

console.log('Attempting to connect to MongoDB...')

mongoose.connect(mongoURI)
    .then(() => 
      console.log('MongoDB connection established successfully'))
    .catch(err => {
      console.error('MongoDB connection error details:', err); 
    });

export default mongoose.connection;
