import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {StudentService} from '../../../shared/services/student.service';
import {SchoolService} from '../../../shared/services/school.service';
import {ClassService} from '../../../shared/services/class.service';
import {SubjectService} from '../../../shared/services/subject.service'
import {ExaminationService} from '../../../shared/services/examination.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {ResultService} from '../../../shared/services/result.service';
import {SchoolTeacherAdmitCardComponent} from './school-teacher-admit-card.component';

const routes: Routes = [{
  path: '',
  component: SchoolTeacherAdmitCardComponent,
  data: {
    heading: 'Admit Card'
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
    ClassService,
    SubjectService,
    TeacherService,
    SchoolService,
    StudentService,
    ExaminationService,
    ResultService
  ],
  declarations: [SchoolTeacherAdmitCardComponent]
})
export class SchoolTeacherAdmitCardModule {
}
