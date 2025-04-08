import { Schema, type Document, Types } from 'mongoose';

export interface BillParticipant {
  userId: Types.ObjectId;
  amountOwed: number;
}

export interface BillDocument extends Document {
  billId: string;
  title: string;
  totalAmount: number;
  date: Date;
  createdBy: string;
  participants: [string];
  notes?: string;
}



const billSchema = new Schema<BillDocument>({
  title: {
    type: String,
    required: true,
  },
  billId: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,// #ref: 'User',
    
    required: true,
  },
  participants: [String],
  notes: {
    type: String,
  },
});

export default billSchema;
