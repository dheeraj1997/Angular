import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SchoolService} from '../../../shared/services/school.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';
import {StudentService} from '../../../shared/services/student.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {StaffService} from '../../../shared/services/staff.service';
import {NoticeService} from '../../../shared/services/notice.service';
import {ClassService} from '../../../shared/services/class.service';
import {LibrarianService} from '../../../shared/services/librarian.service';
import {SubjectService} from '../../../shared/services/subject.service';
import {GSettingsService} from '../../../shared/services/g-settings.service';
import {SchoolAdminDashboardComponent} from './school-admin-dashboard.component';
import {SchoolAdminDashboardRoutes} from './school-admin-dashboard.routing';
import {SessionService} from '../../../shared/services/session.service';
import {ExpensesService} from '../../../shared/services/expenses.service';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
     FormsModule,
    RouterModule.forChild(SchoolAdminDashboardRoutes),
    NgxChartsModule
  ],
  providers: [
    StudentService,
    SchoolService,
    TeacherService,
    NoticeService,
    StaffService,
    ClassService,
    SubjectService,
    SessionService,
    GSettingsService,
    LibrarianService,
    ExpensesService
  ],
  declarations: [SchoolAdminDashboardComponent]
})

export class SchoolAdminDashboardModule {
}
