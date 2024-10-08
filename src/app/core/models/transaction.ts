export interface Transaction {
  id: string;
  accountId: string;
  type: 'credit' | 'debit';
  amount: number;
  category: string;
  description: string;
  date: Date;
  createdAt: Date;
}
