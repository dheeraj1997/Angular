import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AdminOrganizationGuard implements CanActivate {

	constructor(private router: Router) {
	}

	canActivate() {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user && user.userType && 
      user.userType.type === 'admin' && 
      user.userType.category === 'organization') {
      return true;
    }
    this.router.navigate(['/user']);
    return false;
  }

}
	

