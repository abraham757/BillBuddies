import { User } from './User'; // Assuming the User interface is defined elsewhere
import { Expense } from './Expense'; // Assuming the Expense interface is defined elsewhere

export interface Debt {
  _id: string;
  fromUser: User; // User who owes money
  toUser: User; // User who is owed money
  amount: number;
  expenseId: Expense; // The expense associated with this debt
  settled: boolean; // Whether the debt has been settled
}
