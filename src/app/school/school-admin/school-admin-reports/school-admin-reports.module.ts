import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {CsvService} from '../../../shared/services/csv.service';
import {SchoolService} from '../../../shared/services/school.service';
import {ClassService} from '../../../shared/services/class.service';
import {StudentService} from '../../../shared/services/student.service';
import {SessionService} from '../../../shared/services/session.service';
import {SchoolAdminReportsComponent} from './school-admin-reports.component';
import {SchoolAdminReportsAttendanceComponent} from './school-admin-reports-attendance/school-admin-reports-attendance.component';
import { SchoolAdminReportsFeeLedgerComponent } from './school-admin-reports-fee-ledger/school-admin-reports-fee-ledger.component';

const routes: Routes = [
{
  path: '',
  component: SchoolAdminReportsComponent,

  children: [
  {
    path: 'attendance',
    component: SchoolAdminReportsAttendanceComponent,
    data: {
      heading: 'Attendance Report'
    }
  },
  {
    path: 'feeledger',
    component: SchoolAdminReportsFeeLedgerComponent,
    data: {
      heading: 'Fee Ledger Report'
    }
  },
  ]
}
];

@NgModule({
  imports: [
  CommonModule,
  NgbModule,
  FormsModule,
  RouterModule.forChild(routes)
  ],
  providers: [
  SchoolService,
  StudentService,
  ClassService,
  CsvService,
  SessionService
  ],
  declarations: [SchoolAdminReportsComponent, SchoolAdminReportsAttendanceComponent, SchoolAdminReportsFeeLedgerComponent]
})
export class SchoolAdminReportsModule {
}
