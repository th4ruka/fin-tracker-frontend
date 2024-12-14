export interface Account {
  id?: string;
  name: string;
  type: 'savings' | 'checking' | 'credit' | 'investment';
  balance: number;
  currency: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
