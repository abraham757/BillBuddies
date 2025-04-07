import type { Bill } from './Bill';

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedBills: Bill[];
}
export type { Bill as default }
