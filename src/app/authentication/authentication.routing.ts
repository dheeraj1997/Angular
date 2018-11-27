import {Routes} from '@angular/router';

import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotComponent} from './forgot/forgot.component';
import {LockscreenComponent} from './lockscreen/lockscreen.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'login',
      component: SigninComponent
    }, {
      path: 'sign-up',
      component: SignupComponent
    }, {
      path: 'forgot',
      component: ForgotComponent
    }, {
      path: 'lock-screen',
      component: LockscreenComponent
    }, {
      path: '',
      redirectTo: 'login'
    }, {
      path: '**',
      redirectTo: ''
    }
    ]
  }
];
