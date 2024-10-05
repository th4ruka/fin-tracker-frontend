import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

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
    private dialogRef: MatDialogRef<CreateAccountDialogComponent>
  ) {
    this.accountForm = this.fb.group({
      accountName: ['', Validators.required],
      accountType: ['', Validators.required],
      initialBalance: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      // Perform your logic to create a new account here
      console.log(this.accountForm.value);

      // Close the dialog and pass the form data back
      this.dialogRef.close(this.accountForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

