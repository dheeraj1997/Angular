import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {NgxChartsModule} from '@swimlane/ngx-charts';
import {StudentService} from '../../../shared/services/student.service';
import {SchoolService} from '../../../shared/services/school.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {StaffService} from '../../../shared/services/staff.service';
import {NoticeService} from '../../../shared/services/notice.service';
import {ClassService} from '../../../shared/services/class.service';
import {LibrarianService} from '../../../shared/services/librarian.service';
import {SubjectService} from '../../../shared/services/subject.service';
import {GSettingsService} from '../../../shared/services/g-settings.service';
import {SchoolTeacherDashboardComponent} from './school-teacher-dashboard.component';
import {SchoolTeacherDashboardRoutes} from './school-teacher-dashboard.routing';

@NgModule({
  imports: [
  CommonModule,
  RouterModule.forChild(SchoolTeacherDashboardRoutes),
  NgxChartsModule
  ],
  providers:[NoticeService,
  SchoolService,
  TeacherService,
  GSettingsService,
  StudentService,
  LibrarianService,
  StaffService,
  ClassService,
  SubjectService,],
  declarations: [SchoolTeacherDashboardComponent]
})

export class SchoolTeacherDashboardModule {
}
