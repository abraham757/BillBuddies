

export interface Bill {
  billId: string;
  totalAmount: number;
  description?: string;
  participants: string[]; 
  createdBy: string;
  title: string;
  paidBy: string;
  date?: string;
}