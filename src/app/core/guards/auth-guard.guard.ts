import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authState$.pipe(
    map(user => {
      if (user) {
        return true; // User is authenticated, allow access
      } else {
        router.navigate(['/login']); // Redirect to login if not authenticated
        return false;
      }
    })
  );
};

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth-service/auth.service'; // Adjust the path to your AuthService
// import { Observable } from 'rxjs';
// import { map, take } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): Observable<boolean> {
//     return this.authService.authState$.pipe(
//       take(1),
//       map(user => {
//         if (user) {
//           return true;
//         } else {
//           // If not authenticated, redirect to the login page
//           this.router.navigate(['/login']);
//           return false;
//         }
//       })
//     );
//   }
// }
