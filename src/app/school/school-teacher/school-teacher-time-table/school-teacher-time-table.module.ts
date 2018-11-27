import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchoolTeacherTimeTableComponent} from './school-teacher-time-table.component';
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


const routes: Routes = [{
  path: '',
  component: SchoolTeacherTimeTableComponent,
  data: {
    heading: 'Time Table'
  }
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
    TimeTableService
  ],
  declarations: [SchoolTeacherTimeTableComponent]
})
export class SchoolTeacherTimeTableModule {
}
