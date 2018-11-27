import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GoogleAnalyticsEventsService} from '../../../shared/services/google-analytics-events.service';
import {UserService} from '../../../shared/services/user.service';
import {AddressService} from '../../../shared/services/address.service';
import {EmployeeService} from '../../../shared/services/employee.service';
import {AdminSuperEmployeeComponent} from './admin-super-employee.component';
import {AdminSuperEmployeeAddComponent} from './admin-super-employee-add/admin-super-employee-add.component';
import {AdminSuperEmployeeViewComponent} from './admin-super-employee-view/admin-super-employee-view.component';
import {AdminSuperEmployeeEditComponent} from './admin-super-employee-edit/admin-super-employee-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSuperEmployeeComponent,
    children: [
      {
        path: 'add',
        component: AdminSuperEmployeeAddComponent,
        data: {
          heading: 'Add Employee'
        }
      },
      {
        path: 'view',
        component: AdminSuperEmployeeViewComponent,
        data: {
          heading: 'View Employee'
        }
      },
      {
        path: 'edit/:employeeId',
        component: AdminSuperEmployeeEditComponent,
        data: {
          heading: 'Edit Employee'
        }
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule
  ],
  providers: [
    AddressService,
    EmployeeService,
    UserService,
    GoogleAnalyticsEventsService
  ],
  declarations: [
    AdminSuperEmployeeComponent,
    AdminSuperEmployeeAddComponent,
    AdminSuperEmployeeViewComponent,
    AdminSuperEmployeeEditComponent
  ]
})
export class AdminSuperEmployeeModule {
}
