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
import {SchoolTeacherResultComponent} from './school-teacher-result.component';
import {SchoolTeacherResultAddComponent} from './school-teacher-result-add/school-teacher-result-add.component';
import {SchoolTeacherResultViewComponent} from './school-teacher-result-view/school-teacher-result-view.component';
import {SchoolTeacherResultCsvComponent} from './school-teacher-result-csv/school-teacher-result-csv.component';


const routes: Routes = [{
  path: '',
  component: SchoolTeacherResultComponent,
  children: [
    {
      path: 'add',
      component: SchoolTeacherResultAddComponent,
      data: {
        heading: 'Publish Result'
      }
    },
    {
      path: 'view',
      component: SchoolTeacherResultViewComponent,
      data: {
        heading: 'View Result'
      }
    },
    {
      path: 'csv',
      component: SchoolTeacherResultCsvComponent,
      data: {
        heading: 'Upload CSV'
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
    ClassService,
    SubjectService,
    TeacherService,
    SchoolService,
    StudentService,
    ExaminationService,
    ResultService
  ],
  declarations: [
    SchoolTeacherResultComponent,
    SchoolTeacherResultAddComponent,
    SchoolTeacherResultViewComponent,
    SchoolTeacherResultCsvComponent
  ]
})
export class SchoolTeacherResultModule {
}
