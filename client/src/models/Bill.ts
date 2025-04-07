export interface Bill {
  billId: string;
  amount: number;
  description?: string;
  participants: string[]; 
  paidBy: string;
  date?: string;
}