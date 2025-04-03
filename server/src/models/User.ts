// server/src/models/user.ts
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
// Import Group schema like so import Group from './group';
// Import Expense schema like so import Expense from './expense';

// Define the User interface (to define types)
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  correctPassword(password: string): Promise<boolean>;
  groups: Schema.Types.ObjectId[];  // User's groups (array of Group references)
  expenses: Schema.Types.ObjectId[];  // User's expenses (array of Expense references)
}

// User Schema
const userSchema = new Schema<UserDocument>(
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
  },
  { timestamps: true },
);

// Method to compare passwords
userSchema.methods.correctPassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password); // Compare hashed passwords
  };
// You can add pre-save hook for password hashing, if needed
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = model<UserDocument>('User', userSchema);

export default User;
