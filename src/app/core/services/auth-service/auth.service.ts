import { Injectable } from '@angular/core';
import { Auth, user, signInWithPopup, GoogleAuthProvider, signOut,
  signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root', // This makes the service a singleton one and available globally
})
export class AuthService {
  authState$: Observable<any>;

  constructor(private auth: Auth) {
    this.authState$ = user(this.auth); // Tracks current user state
  }

  signUpWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Registration successful!', user);
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Registration failed: ${errorCode} - ${errorMessage}`);
        throw new Error(errorMessage); // Optionally rethrow the error for handling in the component
      });
  }

  loginWithPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      console.log('Login successful!', user); // Handle user data (e.g., store in a variable, log it, etc.)
      return user;
    })
    .catch((error) => {
      // Handle login error
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Login failed: ${errorCode} - ${errorMessage}`);
      throw new Error(errorMessage); // Optionally, re-throw the error to handle it outside
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }

  getUser() {
    return this.auth.currentUser;
  }
}
