import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Account } from '../../../models/account';
import { AuthService } from '../../../services/auth-service/auth.service';
import { FirestoreService } from '../../../services/firestore-service/firestore.service';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,
    FormsModule, MatButtonModule, MatDialogModule, ReactiveFormsModule]
})
export class CreateAccountDialogComponent {

  accountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    private authService: AuthService,
    private firestore: FirestoreService
  ) {
    this.accountForm = this.fb.group({
      accountName: ['', Validators.required],
      currency: ['', Validators.required],
      initialBalance: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      // Perform your logic to create a new account here
      console.log(this.accountForm.value);
      const newAccount: Account = {
        userId : this.authService.getUser()?.uid ?? null, // Fallback to `null` if `uid` is `undefined`
        accountName : this.accountForm.get('accountName')?.value,
        balance: this.accountForm.get('initialBalance')?.value,
        currency: this.accountForm.get('currency')?.value,
        createdAt: new Date()
      }
      this.firestore.addAccount(this.authService.getUser()?.uid, newAccount);
      // Close the dialog and pass the form data back
      this.dialogRef.close(this.accountForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

