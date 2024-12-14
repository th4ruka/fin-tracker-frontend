import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs, orderBy, getDoc } from '@angular/fire/firestore';
import { Transaction } from '../models/transaction';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly COLLECTION_NAME = 'transactions';

  constructor(
    private firestore: Firestore,
    private accountService: AccountService
  ) {}

  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<string> {
    const transactionsRef = collection(this.firestore, this.COLLECTION_NAME);
    const docRef = await addDoc(transactionsRef, {
      ...transaction,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Update account balance
    if (transaction.status === 'completed') {
      const account = await this.accountService.getAccountsByUserId(transaction.userId);
      const targetAccount = account.find(acc => acc.id === transaction.accountId);

      if (targetAccount) {
        const balanceChange = transaction.type === 'expense' ? -transaction.amount : transaction.amount;
        await this.accountService.updateAccount(transaction.accountId, {
          balance: targetAccount.balance + balanceChange
        });
      }
    }
    await updateDoc(docRef, {
      id: docRef.id
    });

    return docRef.id;
  }

  async updateTransaction(id: string, transaction: Partial<Transaction>): Promise<void> {
    const docRef = doc(this.firestore, this.COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...transaction,
      updatedAt: new Date()
    });
  }

  async deleteTransaction(id: string): Promise<void> {
    // Get the transaction details before deleting
    const transactionDoc = await getDoc(doc(this.firestore, this.COLLECTION_NAME, id));
    const transaction = transactionDoc.data() as Transaction;

    // Only update balance if the transaction was completed
    if (transaction && transaction.status === 'completed') {
      const accounts = await this.accountService.getAccountsByUserId(transaction.userId);
      const targetAccount = accounts.find(acc => acc.id === transaction.accountId);

      if (targetAccount) {
        // Reverse the original transaction's effect on balance
        const balanceChange = transaction.type === 'expense'
          ? transaction.amount  // Add back expenses
          : -transaction.amount; // Subtract income

        await this.accountService.updateAccount(transaction.accountId, {
          balance: targetAccount.balance + balanceChange
        });
      }
    }

    // Delete the transaction
    const docRef = doc(this.firestore, this.COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    const transactionsRef = collection(this.firestore, this.COLLECTION_NAME);
    const q = query(
      transactionsRef,
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data['date']?.toDate()
      } as Transaction;
    });
  }

  async getTransactionsByAccount(accountId: string): Promise<Transaction[]> {
    const transactionsRef = collection(this.firestore, this.COLLECTION_NAME);
    const q = query(
      transactionsRef,
      where('accountId', '==', accountId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Transaction));
  }
}
