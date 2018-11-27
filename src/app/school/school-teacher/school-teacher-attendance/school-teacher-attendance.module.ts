import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {TeacherService} from '../../../shared/services/teacher.service';
import {SchoolService} from '../../../shared/services/school.service';
import {ClassService} from '../../../shared/services/class.service';
import {StudentService} from '../../../shared/services/student.service';
import {TimeTableService} from '../../../shared/services/timeTable.service';
import {AttendanceService} from '../../../shared/services/attendance.service';
import {SubjectService} from '../../../shared/services/subject.service';
import {GSettingsService} from '../../../shared/services/g-settings.service';
import {SchoolTeacherAttendanceComponent} from './school-teacher-attendance.component';
import {SchoolTeacherAttendanceAddComponent} from './school-teacher-attendance-add/school-teacher-attendance-add.component';
import {SchoolTeacherAttendanceViewComponent} from './school-teacher-attendance-view/school-teacher-attendance-view.component';
import {SchoolTeacherAttendanceTakeComponent} from './school-teacher-attendance-take/school-teacher-attendance-take.component';

const routes: Routes = [{
  path: '',
  component: SchoolTeacherAttendanceComponent,
  children: [{
    path: 'add',
    component: SchoolTeacherAttendanceAddComponent,
    data: {
      heading: 'Add Attendance'

    }
  }, {
    path: 'take/:teacherAttendanceId',
    component: SchoolTeacherAttendanceTakeComponent,
    data: {
      heading: 'Take Attendance'

    }
  }, {
    path: 'view/:teacherAttendanceId',
    component: SchoolTeacherAttendanceViewComponent,
    data: {
      heading: 'View Attendance'

    }
  }]
}];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    TeacherService,
    SchoolService,
    StudentService,
    AttendanceService,
    ClassService,
    SubjectService,
    TimeTableService,
    GSettingsService
  ],
  declarations: [
    SchoolTeacherAttendanceComponent,
    SchoolTeacherAttendanceAddComponent,
    SchoolTeacherAttendanceViewComponent,
    SchoolTeacherAttendanceTakeComponent]
})
export class SchoolTeacherAttendanceModule {
}
