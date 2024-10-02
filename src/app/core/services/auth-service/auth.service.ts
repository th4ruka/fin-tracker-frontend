import { Injectable } from '@angular/core';
import { Auth,user, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // This makes the service a singleton one and available globally
})
export class AuthService {
  authState$: Observable<any>;

  constructor(private auth: Auth) {
    this.authState$ = user(this.auth); // Tracks current user state
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
