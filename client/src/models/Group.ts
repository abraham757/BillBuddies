import { User } from './User'; // Assuming the User interface is defined elsewhere
import { Expense } from './Expense'; // Assuming the Expense interface is defined elsewhere

export interface Group {
  _id: string;
  groupId: string;
  members: User[]; // List of users in the group
  expenses: Expense[]; // List of expenses associated with the group
}
