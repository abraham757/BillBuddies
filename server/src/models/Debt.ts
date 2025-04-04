// server/src/models/Debt.ts
import { Schema, model, Document } from 'mongoose';

//Define Debt interface
interface DebtDocument extends Document {
  fromUserId: Schema.Types.ObjectId;  // User who owes
  toUserId: Schema.Types.ObjectId;    // User who is owed
  amount: number;                      // Debt amount
  expenseId: Schema.Types.ObjectId;   // Reference to the expense that caused the debt
  settled: boolean;                    // Whether the debt is settled or not
}

// Debt Schema
const debtSchema = new Schema<DebtDocument>({
  fromUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  toUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  amount: {
    type: Number,
    required: true
},
  expenseId: {
    type: Schema.Types.ObjectId,
    ref: 'Expense',
    required: true
},
  settled: {
    type: Boolean, //Debt settled
    default: false },  // Debt is initially not settled
}, { timestamps: true });

const Debt = model<DebtDocument>('Debt', debtSchema);

export default Debt;