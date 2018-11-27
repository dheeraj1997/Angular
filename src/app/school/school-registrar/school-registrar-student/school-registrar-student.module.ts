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
import {StaffService} from '../../../shared/services/staff.service';
import {UserService} from '../../../shared/services/user.service';
import { SchoolRegistrarStudentComponent } from './school-registrar-student.component';
import { SchoolRegistrarStudentAddComponent } from './school-registrar-student-add/school-registrar-student-add.component';
import { SchoolRegistrarStudentCsvComponent } from './school-registrar-student-csv/school-registrar-student-csv.component';
import { SchoolRegistrarStudentEditComponent } from './school-registrar-student-edit/school-registrar-student-edit.component';
import { SchoolRegistrarStudentViewComponent } from './school-registrar-student-view/school-registrar-student-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolRegistrarStudentComponent,
    children: [
      {
        path: 'add',
        component: SchoolRegistrarStudentAddComponent,
        data: {
          heading: 'Add Student'
        }
      },
      {
        path: 'csv',
        component: SchoolRegistrarStudentCsvComponent,
        data: {
          heading: 'Upload CSV'
        }
      },
      {
        path: 'view',
        component: SchoolRegistrarStudentViewComponent,
        data: {
          heading: 'View Student'
        }
      },
      {
        path: 'edit/:studentId/:sessionId',
        component: SchoolRegistrarStudentEditComponent,
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
    UserService,
    StudentService,
    ClassService,
    SessionService,
    AddressService,
    StaffService
  ],
  declarations: [
    SchoolRegistrarStudentComponent,
    SchoolRegistrarStudentAddComponent,
    SchoolRegistrarStudentViewComponent,
    SchoolRegistrarStudentEditComponent,
    SchoolRegistrarStudentCsvComponent
  ]
})
export class SchoolRegistrarStudentModule { }
