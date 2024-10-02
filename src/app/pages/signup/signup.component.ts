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
    private authService: AuthService) {

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
    // Handle form submission and send data to backend
  }

}
