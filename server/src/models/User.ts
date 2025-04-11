import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Import the Bill schema and interface
import billSchema, { BillDocument } from './Bill.js';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  savedBills: BillDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
  billCount: number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // Stores an array of bills using the embedded billSchema
    savedBills: [billSchema],
  },
  {
    toJSON: {
      virtuals: true, // Enable virtual properties to be included in JSON output
    },
  }
);

// Middleware to hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Custom method to compare and validate password during login
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Virtual property that returns the number of saved bills
userSchema.virtual('billCount').get(function () {
  return this.savedBills.length;
});

const User = model<UserDocument>('User', userSchema);

export default User;
