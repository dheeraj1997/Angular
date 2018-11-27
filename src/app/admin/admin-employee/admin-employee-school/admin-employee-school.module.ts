import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {MomentModule} from 'angular2-moment';

import {AddressService} from '../../../shared/services/address.service';
import {SchoolService} from '../../../shared/services/school.service';
import {AdminEmployeeSchoolComponent} from './admin-employee-school.component';
import {AdminEmployeeSchoolAddComponent} from './admin-employee-school-add/admin-employee-school-add.component';
import {AdminEmployeeSchoolViewComponent} from './admin-employee-school-view/admin-employee-school-view.component';
import {AdminEmployeeSchoolEditComponent} from './admin-employee-school-edit/admin-employee-school-edit.component';


const routes: Routes = [
  {
    path: '',
    component: AdminEmployeeSchoolComponent,
    children: [
      {
        path: 'add',
        component: AdminEmployeeSchoolAddComponent
      },
      {
        path: 'view',
        component: AdminEmployeeSchoolViewComponent
      },
      {
        path: 'edit/:schoolId',
        component: AdminEmployeeSchoolEditComponent
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDm0RFD5xqng-8OdpBwXMy4j0BxCJwf-B0'
    }),
    MomentModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AddressService,
    SchoolService
  ],
  declarations: [
    AdminEmployeeSchoolComponent,
    AdminEmployeeSchoolAddComponent,
    AdminEmployeeSchoolViewComponent,
    AdminEmployeeSchoolEditComponent]
})
export class AdminEmployeeSchoolModule {
}
