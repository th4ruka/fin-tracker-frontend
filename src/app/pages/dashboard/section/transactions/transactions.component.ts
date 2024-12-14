import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Transaction } from '../../../../core/models/transaction';
import { Account } from '../../../../core/models/account';
import { TransactionService } from '../../../../core/services/transaction.service';
import { AccountService } from '../../../../core/services/account.service';
import { AuthService } from '../../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  accounts: Account[] = [];
  transactionForm: FormGroup;
  isEditing = false;
  currentUserId = '';

  displayedColumns: string[] = ['date', 'type', 'amount', 'category', 'account', 'description', 'status', 'actions'];

  transactionTypes = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
    { value: 'transfer', label: 'Transfer' }
  ];

  categories = [
    { value: 'salary', label: 'Salary' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'transport', label: 'Transportation' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Healthcare' },
    { value: 'other', label: 'Other' }
  ];

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      id: [''],
      accountId: ['', Validators.required],
      type: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: [new Date(), Validators.required],
      payee: [''],
      status: ['completed', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
        this.loadAccounts();
        this.loadTransactions();
      }
    });
  }

  async loadAccounts() {
    this.accounts = await this.accountService.getAccountsByUserId(this.currentUserId);
  }

  async loadTransactions() {
    this.transactions = await this.transactionService.getTransactionsByUserId(this.currentUserId);
  }

  async onSubmit() {
    if (this.transactionForm.valid) {
      const transactionData = {
        ...this.transactionForm.value,
        userId: this.currentUserId
      };

      if (this.isEditing) {
        const id = transactionData.id;
        delete transactionData.id;
        await this.transactionService.updateTransaction(id, transactionData);
      } else {
        await this.transactionService.createTransaction(transactionData);
      }

      this.resetForm();
      await this.loadTransactions();
    }
  }

  editTransaction(transaction: Transaction) {
    this.isEditing = true;
    this.transactionForm.patchValue({
      ...transaction,
      date: new Date(transaction.date)
    });
  }

  async deleteTransaction(id: string) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      await this.transactionService.deleteTransaction(id);
      await this.loadTransactions();
    }
  }

  resetForm() {
    this.isEditing = false;
    this.transactionForm.reset({
      date: new Date(),
      status: 'completed'
    });
  }

  getAccountName(accountId: string): string {
    const account = this.accounts.find(acc => acc.id === accountId);
    return account ? account.name : 'Unknown Account';
  }

  formatAmount(amount: number, type: string): string {
    return type === 'expense' ? `-${amount.toFixed(2)}` : amount.toFixed(2);
  }
}
