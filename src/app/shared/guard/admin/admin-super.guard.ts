import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';


@Injectable()
export class AdminSuperGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user && user.userType && user.userType.type === 'admin' && user.userType.category === 'super') {
      return true;
    }
    this.router.navigate(['/user']);
    return false;
  }
}
