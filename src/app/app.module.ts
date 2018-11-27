import * as Raven from 'raven-js';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {NgModule, ErrorHandler} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SidebarModule} from 'ng-sidebar';
import {GoogleAnalyticsEventsService} from './shared/services/google-analytics-events.service';
import {AuthService} from './shared/services/authentication.service';
// import {AngularFireModule} from 'angularfire2';
// import {AngularFireDatabaseModule} from 'angularfire2/database';
import 'rxjs/add/operator/map';
import {AppRoutes} from './app.routing';
import {AppComponent} from './app.component';
import {NotificationService} from './shared/services/notification.service';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {MenuLayoutComponent} from './layouts/menu-layout/menu-layout.component';
import {SchoolTeacherGuard} from './shared/guard/school/school-teacher.guard';
import {SchoolRegistrarGuard} from './shared/guard/school/school-registrar.guard';
import {SchoolAccountantGuard} from './shared/guard/school/school-accountant.guard';
import {SchoolAdminGuard} from './shared/guard/school/school-admin.guard';
import {SchoolLibrarianGuard} from './shared/guard/school/school-librarian.guard';
import {SchoolHrGuard} from './shared/guard/school/school-hr.guard';
import {SchoolOtherGuard} from './shared/guard/school/school-other.guard';
import {AdminEmployeeGuard} from './shared/guard/admin/admin-employee.guard';
import {AdminSuperGuard} from './shared/guard/admin/admin-super.guard';
import {AdminOrganizationGuard} from './shared/guard/admin/admin-organization.guard';
import {SchoolStudentGuard} from './shared/guard/school/school-student.guard';
import {SchoolGuardianGuard} from './shared/guard/school/school-guardian.guard';
import {SharedModule} from './shared/shared.module';

// export const firebaseConfig = {
//   apiKey: 'AIzaSyBL-ZZ6wNyoHD4JtMV7DfoDUop8Pjjq5gQ',
//   authDomain: 'inforida-1518888945801.firebaseapp.com',
//   databaseURL: 'https://inforida-1518888945801.firebaseio.com',
//   projectId: 'inforida-1518888945801',
//   storageBucket: 'inforida-1518888945801.appspot.com',
//   messagingSenderId: '884661443829'
// };

Raven
  .config('https://223681ae91594885a7ae64fa36e8c4d3@sentry.io/287754')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err.originalError || err);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MenuLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true,
      preventDuplicates: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      }
    }),
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule
  ],

  providers: [
    GoogleAnalyticsEventsService,
    SchoolOtherGuard,
    SchoolHrGuard,
    SchoolLibrarianGuard,
    SchoolAdminGuard,
    SchoolAccountantGuard,
    SchoolTeacherGuard,
    SchoolStudentGuard,
    SchoolGuardianGuard,
    SchoolRegistrarGuard,
    AdminOrganizationGuard,
    AdminEmployeeGuard,
    AdminSuperGuard,
    AuthService,
    NotificationService,
    {provide: ErrorHandler, useClass: RavenErrorHandler}
  ],
  // providers: [
  //   GoogleAnalyticsEventsService,
  //   SchoolOtherGuard,
  //   SchoolHrGuard,
  //   SchoolLibrarianGuard,
  //   SchoolAdminGuard,
  //   SchoolAccountantGuard,
  //   SchoolTeacherGuard,
  //   SchoolRegistrarGuard,
  //   SchoolStudentGuard,
  //   SchoolGuardianGuard,
  //   AdminEmployeeGuard,
  //   AdminSuperGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
