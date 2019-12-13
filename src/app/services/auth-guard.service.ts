import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DatabaseService } from './database.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( public router: Router,private db:DatabaseService) {}
  canActivate(): boolean {
    if (!this.db.getUser()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}