
  export interface Group {
    _id: string;
    groupId: string;
    members: User[]; // List of users in the group
    expenses: Expense[]; // List of expenses related to the group
  }

  export interface Expense {
    _id: string;
    amount: number;
    description: string;
    date: string;
    groupId: Group; // Reference to the group where the expense belongs
    createdBy: User; // The user who created/logged the expense
    paidBy: User; // The user who actually paid for the expense
  }

  export interface Debt {
    _id: string;
    fromUser: User; // User who owes money
    toUser: User; // User who is owed money
    amount: number;
    expenseId: Expense; // The expense associated with this debt
    settled: boolean; // Whether the debt has been settled
  }

  export interface User {
    _id: string;
    username: string;
    email: string;
    groups: Group[]; // List of groups the user is a member of
    expensesPaid: Expense[]; // List of expenses this user actually paid for
    expensesCreated: Expense[]; // List of expenses this user logged in the system
  }
  
  export interface AuthData {
    token: string;
    user: User;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  export interface AddUserInput {
    username: string;
    email: string;
    password: string;
  }
  
  export interface AddGroupInput {
    groupId: string;
    members: string[]; // List of member IDs for the group
  }

  export interface AddExpenseInput {
    groupId: string;
    paidBy: string;
    amount: number;
    description: string;
  }
  
  export interface CreateDebtInput {
    fromUser: string;
    toUser: string;
    amount: number;
    expenseId: string;
  }

  export interface MeData {
    me: User;
  }
  
  export interface LoginData {
    login: AuthData;
  }
  
  export interface AddUserData {
    addUser: AuthData;
  }
  
  export interface CreateGroupData {
    createGroup: Group; // The group created
  }
  
  export interface AddExpenseData {
    addExpense: Expense; // The expense added
  }
  
  export interface SplitExpenseData {
    splitExpense: Debt[]; // List of debts created after splitting the expense
  }
  
  export interface SettleDebtData {
    settleDebt: Debt; // The debt that was settled
  }
  
  export interface RemoveGroupData {
    removeGroup: Group; // Group removed
  }
  
  export interface RemoveExpenseData {
    removeExpense: Expense; // Expense removed
  }