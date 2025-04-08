import type { Request, Response } from 'express';
import User from '../models/User.js';
import { signToken } from '../services/auth.js';

// Get a single user by either their id or username
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const foundUser = await User.findOne({
      $or: [{ _id: req.user ? req.user._id : req.params.id }, { username: req.params.username }],
    });

    if (!foundUser) {
      return res.status(404).json({ message: 'Cannot find a user with this id!' });
    }

    const safeUser = {
      username: foundUser.username,
      email: foundUser.email,
      _id: foundUser._id,
      savedBills: foundUser.savedBills
    };

    return res.json(safeUser);
  } catch (err) {
    console.error('Error in getSingleUser:', err);
    return res.status(500).json({ 
      message: 'An error occurred while fetching user information.',
      error: (err as Error).message
    });
  }
};

// Create a new user, sign a JWT token, and return both
export const createUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'A user with that email or username already exists!' 
      });
    }

    const user = await User.create(req.body);

    if (!user) {
      return res.status(400).json({ message: 'Something went wrong creating the user!' });
    }

    const token = signToken(user.username as string, user._id as string, user.email as string);

    const safeUser = {
      username: user.username,
      email: user.email,
      _id: user._id,
      savedBills: user.savedBills
    };

    return res.json({ token, user: safeUser });
  } catch (err) {
    console.error('Error in createUser:', err);

    if ((err as any).code === 11000) {
      return res.status(400).json({ 
        message: 'This email or username is already in use.' 
      });
    }

    if ((err as any).name === 'ValidationError') {
      const messages = Object.values((err as any).errors).map((error: any) => error.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    return res.status(500).json({ 
      message: 'An error occurred during signup.',
      error: (err as Error).message
    });
  }
};

// Log in a user and return a signed token and user info
export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ 
      $or: [{ username: req.body.username }, { email: req.body.email }] 
    });

    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(req.body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    const token = signToken(user.username as string, user._id as string, user.email as string);

    const safeUser = {
      username: user.username,
      email: user.email,
      _id: user._id,
      savedBills: user.savedBills
    };

    return res.json({ token, user: safeUser });
  } catch (err) {
    console.error('Error in login:', err);
    return res.status(500).json({ 
      message: 'An error occurred during login.',
      error: (err as Error).message
    });
  }
};

// Save a bill to a user's `savedBills` array
export const saveBill = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $addToSet: { savedBills: req.body } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }

    const safeUser = {
      username: updatedUser.username,
      email: updatedUser.email,
      _id: updatedUser._id,
      savedBills: updatedUser.savedBills
    };

    return res.json(safeUser);
  } catch (err) {
    console.error('Error in saveBill:', err);
    return res.status(500).json({ 
      message: 'An error occurred while saving the bill.',
      error: (err as Error).message
    });
  }
};

// Remove a bill from `savedBills` array
export const deleteBill = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { savedBills: { billId: req.params.billId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }

    const safeUser = {
      username: updatedUser.username,
      email: updatedUser.email,
      _id: updatedUser._id,
      savedBills: updatedUser.savedBills
    };

    return res.json(safeUser);
  } catch (err) {
    console.error('Error in deleteBill:', err);
    return res.status(500).json({ 
      message: 'An error occurred while deleting the bill.',
      error: (err as Error).message
    });
  }
};
