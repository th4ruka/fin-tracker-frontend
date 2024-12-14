import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from '@angular/fire/firestore';
import { Account } from '../models/account';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly COLLECTION_NAME = 'accounts';

  constructor(private firestore: Firestore) {}

  async createAccount(account: Omit<Account, 'id'>): Promise<string> {
    const accountsRef = collection(this.firestore, this.COLLECTION_NAME);
    const docRef = await addDoc(accountsRef, {
      ...account,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await updateDoc(docRef, {
      id: docRef.id
    });
    return docRef.id;
  }

  async updateAccount(id: string, account: Partial<Account>): Promise<void> {
    const docRef = doc(this.firestore, this.COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...account,
      updatedAt: new Date()
    });
  }

  async deleteAccount(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.COLLECTION_NAME}/${id}`);
    await deleteDoc(docRef);
  }

  async getAccountsByUserId(userId: string): Promise<Account[]> {
    const accountsRef = collection(this.firestore, this.COLLECTION_NAME);
    const q = query(accountsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Account));
  }
}
