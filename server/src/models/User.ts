//src/models/user.ts
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
//Import Group schema like so import Group from './group';
//Import Expense schema like so import Expense from './expense';

// Define the User interface (to define types)
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  groups: Schema.Types.ObjectId[];  // User's groups (array of Group references)
  expenses: Schema.Types.ObjectId[];  // User's expenses (array of Expense references)
}
// User Schema
const userSchema = new Schema<UserDocument >(
    {
    username: {
        type: String,
        required: true,
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+@.+\..+/, 'Must use a valid email address'] // Email regex validation
      },
    password: {
        type: String,
        required: true
    },
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],  // Reference to Group model
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],  // Reference to Expense model
  });

// Pre-save middleware to hash password
userSchema.pre<UserDocument>('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash if password is modified
  
    try {
      const salt = await bcrypt.genSalt(10); // Generate salt
      const hashedPassword = await bcrypt.hash(this.password, salt); // Hash the password
      this.password = hashedPassword; // Set the hashed password
      next(); // Continue with saving the user
    } catch (error) {
      next(new Error('Password hashing failed')); // Custom error message
    }
  });
  
  // Function to compare input password with stored hash
  userSchema.methods.comparePassword = async function(inputPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(inputPassword, this.password); // Compare the hashed password
    } catch (error) {
      throw new Error('Password comparison failed');
    }
  };


// Create the User model
const User = model<UserDocument>('User', userSchema);

export default User;