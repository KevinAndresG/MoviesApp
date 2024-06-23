import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { auth } from '../Users/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProtectedRoutesService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (auth.currentUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
