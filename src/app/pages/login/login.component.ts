// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

// }

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
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService){

      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Call the AuthService loginWithPassword method
      this.authService.loginWithPassword(email, password).then(user => {
        console.log('Sign up successful:', user);
        // Redirect to a different page (e.g., dashboard) after successful login
        this.router.navigate(['/dashboard']);
      }).catch(error => {
        console.error('Sign up failed:', error);
        // Display error message to the user (optional: show in the template)
      });
    } else {
      console.error('Form is invalid');
      // Optionally display an error message that the form is invalid
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(result => {
      console.log('Logged in successfully:', result);
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      console.error('Login failed:', error);
    });
  }
}

