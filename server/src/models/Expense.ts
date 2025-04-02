//server/src/models/Expense.ts
import { Schema, model, Document } from 'mongoose';

// Define the Expense interface
interface ExpenseDocument extends Document {
    amount: number;
    description: string;
    groupId: Schema.Types.ObjectId;  // Reference to the Group model
    userId: Schema.Types.ObjectId;  // Reference to the User model (user who added the expense)
    date: Date;
  }

  // Expense Schema
  const expenseSchema = new Schema<ExpenseDocument>({