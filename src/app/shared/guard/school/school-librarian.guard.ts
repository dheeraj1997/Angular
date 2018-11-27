import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';


@Injectable()
export class SchoolLibrarianGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user && user.userType && user.userType.type === 'school' && user.userType.category === 'librarian') {
      return true;
    }
    this.router.navigate(['/user']);
    return false;
  }
}
