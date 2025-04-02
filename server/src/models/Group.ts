import { Schema, model, Document } from 'mongoose';

// Define the Group interface
export interface GroupDocument extends Document {
  groupId: string; // Use a unique identifier for the group
  members: Schema.Types.ObjectId[];  // Array of User references (User IDs)
  expenses: Schema.Types.ObjectId[]; // Expenses related to the group
} //Future idea, use inviteId:string to add members to groups

const groupSchema = new Schema<GroupDocument>(
  {
    groupId: { // Unique identifier for the group
        type: String,
        required: true,
        unique: true
    },
    members: [
      { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    ],
    expenses: [
      { type: Schema.Types.ObjectId, ref: 'Expense' }, // Reference to the Expense model
    ],
    //inviteCode: { type: String, unique: true }  Optional invite code for future feature
  },
  { timestamps: true }
);
// Create the Group model
const Group = model<GroupDocument>('Group', groupSchema);

export default Group;
