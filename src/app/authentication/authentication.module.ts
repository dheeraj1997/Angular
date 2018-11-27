import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthService} from '../shared/services/authentication.service';
import {AuthenticationRoutes} from './authentication.routing';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotComponent} from './forgot/forgot.component';
import {LockscreenComponent} from './lockscreen/lockscreen.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ],
  declarations: [SigninComponent, SignupComponent, ForgotComponent, LockscreenComponent]
})

export class AuthenticationModule {
}
