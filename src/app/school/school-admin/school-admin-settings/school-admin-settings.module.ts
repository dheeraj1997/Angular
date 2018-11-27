import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {NoticeService} from '../../../shared/services/notice.service';
import {SchoolService} from '../../../shared/services/school.service';
import {UserService} from '../../../shared/services/user.service';

import {SubjectService} from '../../../shared/services/subject.service';
import {ClassService} from '../../../shared/services/class.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {TimeTableService} from '../../../shared/services/timeTable.service';
import {GSettingsService} from '../../../shared/services/g-settings.service';
import {SessionService} from '../../../shared/services/session.service';
import {ExaminationService} from '../../../shared/services/examination.service';
import {CapitalizePipe} from '../../../shared/pipes/capitalize.pipe';
import {SchoolAdminSettingsComponent} from './school-admin-settings.component';
import {SchoolAdminSettingsLibraryComponent} from './school-admin-settings-library/school-admin-settings-library.component';
import {SchoolAdminSettingsFeesComponent} from './school-admin-settings-fees/school-admin-settings-fees.component';
import {SchoolAdminSettingsNoticeComponent} from './school-admin-settings-notice/school-admin-settings-notice.component';
import {SchoolAdminSettingsMessagingComponent} from './school-admin-settings-messaging/school-admin-settings-messaging.component';
import {SchoolAdminSettingsStudentComponent} from './school-admin-settings-student/school-admin-settings-student.component';
import {SchoolAdminSettingsSessionComponent} from './school-admin-settings-session/school-admin-settings-session.component';
import {SchoolAdminSettingsGlobalComponent} from './school-admin-settings-global/school-admin-settings-global.component';
import {SchoolAdminSettingsPasswordComponent} from './school-admin-settings-password/school-admin-settings-password.component';
import {SchoolAdminSettingsAttendanceComponent} from './school-admin-settings-attendance/school-admin-settings-attendance.component';
import {SchoolAdminSettingsSchoolComponent} from './school-admin-settings-school/school-admin-settings-school.component';
import {SchoolAdminSettingsExaminationComponent} from './school-admin-settings-examination/school-admin-settings-examination.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAdminSettingsComponent,

    children: [
      {
        path: 'global',
        component: SchoolAdminSettingsGlobalComponent,
        data: {
          heading: 'Global Settings'
        }
      }
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
    TeacherService,
    ClassService,
    SubjectService,
    SessionService,
    TimeTableService,
    ExaminationService,
    NoticeService,
    UserService,
    CapitalizePipe,
    GSettingsService
  ],
  declarations: [
    SchoolAdminSettingsComponent,
    SchoolAdminSettingsLibraryComponent,
    SchoolAdminSettingsFeesComponent,
    SchoolAdminSettingsNoticeComponent,
    SchoolAdminSettingsMessagingComponent,
    SchoolAdminSettingsStudentComponent,
    SchoolAdminSettingsSessionComponent,
    SchoolAdminSettingsGlobalComponent,
    SchoolAdminSettingsPasswordComponent,
    SchoolAdminSettingsAttendanceComponent,
    SchoolAdminSettingsSchoolComponent,
    SchoolAdminSettingsExaminationComponent
  ]
})
export class SchoolAdminSettingsModule {
}
