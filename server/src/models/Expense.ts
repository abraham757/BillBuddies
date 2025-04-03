//server/src/models/Expense.ts
//A single event where money is spent, by a specific person, for a group. It keeps track of the details of the expense (e.g., who paid, how much was paid, what the expense was for)
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
    amount: { 
      type: Number, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    groupId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Group', 
      required: true 
    },  // Reference to Group model
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },  // Reference to User model (user who added the expense)
    date: { 
      type: Date, 
      default: Date.now 
    },
  });
  
  // Create the Expense model
  const Expense = model<ExpenseDocument>('Expense', expenseSchema);
  
  export default Expense;