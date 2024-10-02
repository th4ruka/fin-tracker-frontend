import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { AuthService } from '../../core/services/auth-service/auth.service';
import { NotificationService } from '../../core/services/notification-service/notification.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(result => {
      console.log('Logged in successfully:', result);
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      console.error('Login failed:', error);
    });
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Logged out successfully');
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;

      // Call the AuthService loginWithPassword method
      this.authService.signUpWithEmailAndPassword(email, password).then(user => {
        console.log('Sign up successful:', user);
        this.notificationService.showSuccess("Sign up successful!");
        // Redirect to a different page (e.g., dashboard) after successful login
        this.router.navigate(['/dashboard']);
      }).catch(error => {
        console.error('Sign up failed:', error);
        this.notificationService.showError("Sign up failed!");
        // Display error message to the user (optional: show in the template)
      });
    } else {
      console.error('Form is invalid');
      this.notificationService.showError("Invalid data!");
      // Optionally display an error message that the form is invalid
    }
  }


}
