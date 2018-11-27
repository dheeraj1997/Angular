import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {SchoolService} from '../../../shared/services/school.service';
import {AddressService} from '../../../shared/services/address.service';
import {StudentService} from '../../../shared/services/student.service';
import {ClassService} from '../../../shared/services/class.service';
import {SessionService} from '../../../shared/services/session.service';
import {UserService} from '../../../shared/services/user.service';
import {GSettingsService} from '../../../shared/services/g-settings.service';
import {SchoolAdminStudentComponent} from './school-admin-student.component';
import {SchoolAdminStudentAddComponent} from './school-admin-student-add/school-admin-student-add.component';
import {SchoolAdminStudentViewComponent} from './school-admin-student-view/school-admin-student-view.component';
import {SchoolAdminStudentEditComponent} from './school-admin-student-edit/school-admin-student-edit.component';
import {SchoolAdminStudentCsvComponent} from './school-admin-student-csv/school-admin-student-csv.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolAdminStudentComponent,
    children: [
      {
        path: 'add',
        component: SchoolAdminStudentAddComponent,
        data: {
          heading: 'Add Student'
        }
      },
      {
        path: 'csv',
        component: SchoolAdminStudentCsvComponent,
        data: {
          heading: 'Upload CSV'
        }
      },
      {
        path: 'view',
        component: SchoolAdminStudentViewComponent,
        data: {
          heading: 'View Student'
        }
      },
      {
        path: 'edit/:studentId/:sessionId',
        component: SchoolAdminStudentEditComponent,
        data: {
          heading: 'Edit Student'
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
    StudentService,
    ClassService,
    SessionService,
    UserService,
    GSettingsService,
    AddressService
  ],
  declarations: [
    SchoolAdminStudentComponent,
    SchoolAdminStudentAddComponent,
    SchoolAdminStudentViewComponent,
    SchoolAdminStudentEditComponent,
    SchoolAdminStudentCsvComponent
  ]
})
export class SchoolAdminStudentModule {
}
