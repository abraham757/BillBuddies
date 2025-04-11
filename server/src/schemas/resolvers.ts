import User from "../models/User.js";
import { UserDocument } from "../models/User.js";
import { BillDocument } from "../models/Bill.js";  //  BillDocument
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();



// Helper function for generating JWT tokens with proper typing
const signToken = (user: { username: string; email: string; _id: string | any }): string => {
  const payload = { 
    username: user.username, 
    email: user.email, 
    _id: user._id.toString ? user._id.toString() : user._id 
  };
  return jwt.sign({ data: payload }, process.env.JWT_SECRET || '', { expiresIn: '5h' });
};

const resolvers = {
  Query: {
    // Get the current logged-in user
    me: async (_parent: any, _args: any, context: any): Promise<UserDocument | null> => {
      if (context.user) {
        try {
          return await User.findOne({ _id: context.user._id }).select('-__v -password');
        } catch (error) {
          console.error('Error fetching user data:', error);
          throw new Error('Failed to fetch user data');
        }
      }
      throw new Error('Not logged in error!');
    },

    // Resolver to fetch all bills from all users (without duplicates)
    bills: async (): Promise<BillDocument[]> => {  //  bills
      try {
        // Find all users that have saved bills
        const users = await User.find({ 'savedBills.0': { $exists: true } });
        
        // Extract all bills from all users
        const allBills = users.flatMap(user => user.savedBills);
        
        // Remove duplicates by billId
        const uniqueBillIds = new Set<string>();
        const uniqueBills = allBills.filter(bill => {
          const isDuplicate = uniqueBillIds.has(bill.billId);
          uniqueBillIds.add(bill.billId);
          return !isDuplicate;
        });
        
        return uniqueBills;
      } catch (error) {
        console.error('Error fetching bills:', error);
        throw new Error(`Failed to fetch bills: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
    
    // Resolver to fetch a user by username
    user: async (_parent: any, args: { username?: string }): Promise<UserDocument | null> => {
      try {
        const params = args.username ? { username: args.username } : {};
        return User.findOne(params);
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error(`Failed to fetch user: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  },
  
  Mutation: {
    // Add a new user
    addUser: async (_parent: any, args: { username: string; email: string; password: string }): Promise<{ token: string; user: UserDocument }> => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(`Failed to create user: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
    
    // Login a user
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: UserDocument }> => {
      try {
        const user = await User.findOne({ email });
        
        if (!user) {
          throw new Error('No user found with this email address');
        }
        
        const correctPassword = await user.isCorrectPassword(password);
        
        if (!correctPassword) {
          throw new Error('Incorrect credentials');
        }
        console.log('🔹 User logged in successfully:', user.username);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    
    // Save bill to user's savedBills (renamed from saveBook)
    saveBill: async (_parent: any, { billData }: { billData: BillDocument }, context: any): Promise<UserDocument> => {  //  saveBill
      console.log('context.user', context.user);  //  bill
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $addToSet: { savedBills: billData } },  // savedBills
            { new: true, runValidators: true }
          );
          console.log('Saving bill:', billData);
          if (!updatedUser) {
            throw new Error('Could not find user');
          }
          console.log('Updated user:', updatedUser);  //  bill
          return updatedUser;
        } catch (error) {
          console.error('Error saving bill:', error);  // bill
          throw new Error('Error saving bill to your account');  //  bill
        }
      }
      throw new Error('You need to be logged in error 127!');
    },
    
    // Remove bill from user's savedBills (renamed from removeBook)
    removeBill: async (_parent: any, { billId }: { billId: string }, context: any): Promise<UserDocument> => {  // removeBill
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $pull: { savedBills: { billId } } },  //  savedBills
            { new: true }
          );
          
          if (!updatedUser) {
            throw new Error('Could not find user');
          }
          
          return updatedUser;
        } catch (error) {
          console.error('Error removing bill:', error);  //  bill
          throw new Error('Error removing bill from your account');  //  bill
        }
      }
      throw new Error('You need to be logged in error 150!');
    },
  },
};

export default resolvers;
