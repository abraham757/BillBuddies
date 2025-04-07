import { User } from './User'; // Assuming the User interface is defined elsewhere
import { Group } from './Group'; // Assuming the Group interface is defined elsewhere

export interface Expense {
  _id: string;
  amount: number;
  description: string;
  date: string;
  groupId: Group; // Reference to the group where the expense belongs
  createdBy: User; // The user who created/logged the expense
  paidBy: User; // The user who actually paid for the expense
}
