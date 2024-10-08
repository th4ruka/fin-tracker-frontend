import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  // Add a new user to the 'users' collection
  async addUser(user: User): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${user.id}`);

    // Check if the user already exists
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      // User does not exist, so create a new user
      await setDoc(userDocRef, user);
      console.log(user.username," added successfully!");
    } else {
      console.log(user.username, " already exists!");
    }

    // // Alternative Approach: Firestore merge Option
    // await setDoc(userDocRef, user, { merge: true });

  }

  // Get all users from the 'users' collection
  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef) as Observable<User[]>;
  }

  // Add a new account to a user
  async addAccount(userId: string, account: any): Promise<void> {
    const accountsRef = collection(this.firestore, `users/${userId}/accounts`);
    await addDoc(accountsRef, account);
  }

  // Get all accounts for a specific user
  getAccounts(userId: string): Observable<any[]> {
    const accountsRef = collection(this.firestore, `users/${userId}/accounts`);
    return collectionData(accountsRef) as Observable<any[]>;
  }

  // Add a new transaction to a specific account
  async addTransaction(accountId: string, transaction: any): Promise<void> {
    const transactionsRef = collection(this.firestore, `accounts/${accountId}/transactions`);
    await addDoc(transactionsRef, transaction);
  }

  // Get all transactions for a specific account
  getTransactions(accountId: string): Observable<any[]> {
    const transactionsRef = collection(this.firestore, `accounts/${accountId}/transactions`);
    return collectionData(transactionsRef) as Observable<any[]>;
  }
}
