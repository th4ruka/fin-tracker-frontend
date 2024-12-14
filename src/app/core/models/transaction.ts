export interface Transaction {
  id?: string;
  accountId: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  description: string;
  category: string;
  date: Date; //Do not use Date type, it's not supported by Firestore
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  payee?: string;
  status: 'completed' | 'pending' | 'cancelled';
}
