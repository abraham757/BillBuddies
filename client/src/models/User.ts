import { Group } from './Group'; // Assuming the Group interface is defined elsewhere
import { Expense } from './Expense'; // Assuming the Expense interface is defined elsewhere

export interface User {
  _id: string;
  username: string;
  email: string;
  groups: Group[]; // List of groups the user is a member of
  expensesPaid: Expense[]; // List of expenses this user actually paid for
  expensesCreated: Expense[]; // List of expenses this user logged in the system
}

export type { User as default }
