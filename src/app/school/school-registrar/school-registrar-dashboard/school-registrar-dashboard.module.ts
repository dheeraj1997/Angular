import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NoticeService} from '../../../shared/services/notice.service';
import {StaffService} from '../../../shared/services/staff.service';
import {SchoolService} from '../../../shared/services/school.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TeacherService} from '../../../shared/services/teacher.service';
import {StudentService} from '../../../shared/services/student.service';

import { SchoolRegistrarDashboardComponent } from './school-registrar-dashboard.component';
import { SchoolRegistrarDashboardRoutes } from './school-registrar-dashboard.routing';

@NgModule({
  imports: [
  CommonModule,
  RouterModule.forChild(SchoolRegistrarDashboardRoutes),
  NgxChartsModule
  ],
  providers: [
  NoticeService,
  StaffService,
  SchoolService,
  TeacherService,
  StudentService
  ],

  declarations: [SchoolRegistrarDashboardComponent]
})

export class SchoolRegistrarDashboardModule { }
