import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';


@Injectable()
export class SchoolTeacherGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user && user.userType &&
      user.userType.type === 'school' &&
      user.userType.category === 'teacher') {
      return true;
    }
    this.router.navigate(['/user']);
    return false;
  }
}
