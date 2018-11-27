import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchoolTeacherHomeworkComponent} from './school-teacher-homework.component';
import {SchoolTeacherHomeworkAddComponent} from './school-teacher-homework-add/school-teacher-homework-add.component';
import {SchoolTeacherHomeworkViewComponent} from './school-teacher-homework-view/school-teacher-homework-view.component';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import {SchoolService} from '../../../shared/services/school.service';
import {ClassService} from '../../../shared/services/class.service';
import {SubjectService} from '../../../shared/services/subject.service'
import {TeacherService} from '../../../shared/services/teacher.service';
import {HomeworkService} from '../../../shared/services/homework.service';
import { SchoolTeacherHomeworkEditComponent } from './school-teacher-homework-edit/school-teacher-homework-edit.component';


const routes: Routes = [{
  path: '',
  component: SchoolTeacherHomeworkComponent,
  children: [{
    path: 'add',
    component: SchoolTeacherHomeworkAddComponent,
    data: {
      heading: 'Give Homework'

    }
  }, {
    path: 'view',
    component: SchoolTeacherHomeworkViewComponent,
    data: {
      heading: 'View Homework'

    }
  }, {
    path: 'edit/:homeworkId',
    component: SchoolTeacherHomeworkEditComponent,
    data: {
      heading: 'Edit Homework'

    }
  }]
}];

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],

  providers: [
    ClassService,
    SubjectService,
    TeacherService,
    SchoolService,
    HomeworkService
  ],

  declarations: [SchoolTeacherHomeworkComponent,
    SchoolTeacherHomeworkAddComponent,
    SchoolTeacherHomeworkViewComponent,
    SchoolTeacherHomeworkEditComponent
  ]
})

export class SchoolTeacherHomeworkModule {
}
