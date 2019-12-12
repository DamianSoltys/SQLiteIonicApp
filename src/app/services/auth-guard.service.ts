import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( public router: Router) {}
  canActivate(): boolean {
    if (!this.getUser()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  public getUser() {
      let userData = localStorage.getItem('user');
      if(userData) {
          return true;
      } else {
          return false;
      }
  }
}