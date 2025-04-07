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
  createdBy: Types.ObjectId;
  participants: BillParticipant[];
  notes?: string;
}

const participantSchema = new Schema<BillParticipant>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amountOwed: {
    type: Number,
    required: true,
    min: 0,
  },
});

const billSchema = new Schema<BillDocument>({
  title: {
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  participants: [participantSchema],
  notes: {
    type: String,
  },
});

export default billSchema;
