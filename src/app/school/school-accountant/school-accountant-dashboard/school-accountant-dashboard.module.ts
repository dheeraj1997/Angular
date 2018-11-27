import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SchoolService} from '../../../shared/services/school.service';
import {StudentService} from '../../../shared/services/student.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {NoticeService} from '../../../shared/services/notice.service';
import {StaffService} from '../../../shared/services/staff.service';
import {GSettingsService} from '../../../shared/services/g-settings.service';
import {ExpensesService} from '../../../shared/services/expenses.service';

import {NgxChartsModule} from '@swimlane/ngx-charts';

import {SchoolAccountantDashboardComponent} from './school-accountant-dashboard.component';
import {SchoolAccountantDashboardRoutes} from './school-accountant-dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SchoolAccountantDashboardRoutes),
    NgxChartsModule
  ],
  providers: [
    StudentService,
    SchoolService,
    TeacherService,
    NoticeService,
    StaffService,
    GSettingsService,
    ExpensesService
  ],
  declarations: [SchoolAccountantDashboardComponent]
})

export class SchoolAccountantDashboardModule {
}
