import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AdminEmployeeGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user && user.userType && user.userType.type === 'admin' && user.userType.category === 'employee') {
      return true;
    }
    this.router.navigate(['/user']);
    return false;
  }
}
