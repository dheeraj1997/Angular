import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {SchoolService} from '../../../shared/services/school.service';
import {StaffService} from '../../../shared/services/staff.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {StudentService} from '../../../shared/services/student.service';
import {ClassService} from '../../../shared/services/class.service';
import {AddressService} from '../../../shared/services/address.service';
import {UserService} from '../../../shared/services/user.service';
import {SchoolAdminStaffComponent} from './school-admin-staff.component';
import {SchoolAdminStaffAddComponent} from './school-admin-staff-add/school-admin-staff-add.component';
import {SchoolAdminStaffViewComponent} from './school-admin-staff-view/school-admin-staff-view.component';
import {SchoolAdminStaffEditComponent} from './school-admin-staff-edit/school-admin-staff-edit.component';
import {SchoolAdminStaffCsvComponent} from './school-admin-staff-csv/school-admin-staff-csv.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolAdminStaffComponent,
    children: [
      {
        path: 'add',
        component: SchoolAdminStaffAddComponent,
        data: {
          heading: 'Add Staff'
        }
      },
      {
        path: 'view',
        component: SchoolAdminStaffViewComponent,
        data: {
          heading: 'View Staff'
        }
      },
      {
        path: 'csv',
        component: SchoolAdminStaffCsvComponent,
        data: {
          heading: 'Staff CSV'
        }
      },
      {
        path: 'edit/:staffId',
        component: SchoolAdminStaffEditComponent,
        data: {
          heading: 'Edit Staff'
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
    StudentService,
    UserService,
    StaffService
  ],
  declarations: [SchoolAdminStaffComponent, SchoolAdminStaffAddComponent, SchoolAdminStaffViewComponent, SchoolAdminStaffEditComponent, SchoolAdminStaffCsvComponent]
})
export class SchoolAdminStaffModule {
}
