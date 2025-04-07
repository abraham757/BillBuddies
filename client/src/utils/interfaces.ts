export interface Bill {
  billId: string;
  amount: number;
  description?: string;
  participants: string[];  
  paidBy: string;
  date?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  savedBills: Bill[];  
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

export interface SaveBillInput {
  billId: string;
  amount: number;
  description?: string;
  participants: string[];  
  paidBy: string;
  date?: string;
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

export interface SaveBillData {
  saveBill: User;
}

export interface RemoveBillData {
  removeBill: User;
}
