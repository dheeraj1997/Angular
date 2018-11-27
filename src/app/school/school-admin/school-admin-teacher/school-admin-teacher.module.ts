import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {SchoolService} from '../../../shared/services/school.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {StudentService} from '../../../shared/services/student.service';
import {ClassService} from '../../../shared/services/class.service';
import {AddressService} from '../../../shared/services/address.service';
import {UserService} from '../../../shared/services/user.service';
import {SchoolAdminTeacherComponent} from './school-admin-teacher.component';
import {SchoolAdminTeacherAddComponent} from './school-admin-teacher-add/school-admin-teacher-add.component';
import {SchoolAdminTeacherViewComponent} from './school-admin-teacher-view/school-admin-teacher-view.component';
import {SchoolAdminTeacherEditComponent} from './school-admin-teacher-edit/school-admin-teacher-edit.component';
import { SchoolAdminTeacherCsvComponent } from './school-admin-teacher-csv/school-admin-teacher-csv.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolAdminTeacherComponent,
    children: [
      {
        path: 'add',
        component: SchoolAdminTeacherAddComponent,
        data: {
          heading: 'Add Teacher'
        }
      },
      {
        path: 'view',
        component: SchoolAdminTeacherViewComponent, data: {
        heading: 'View Teacher'
      }
      },
      {
        path: 'edit/:teacherId',
        component: SchoolAdminTeacherEditComponent,
        data: {
          heading: 'Edit Teacher'
        }
      },
      {
        path: 'csv',
        component: SchoolAdminTeacherCsvComponent,
        data: {
          heading: 'Teacher Csv'
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
    AddressService,
    ClassService,
    UserService,
    StudentService
  ],
  declarations: [
    SchoolAdminTeacherComponent,
    SchoolAdminTeacherAddComponent,
    SchoolAdminTeacherViewComponent,
    SchoolAdminTeacherEditComponent,
    SchoolAdminTeacherCsvComponent
  ]
})
export class SchoolAdminTeacherModule {
}
