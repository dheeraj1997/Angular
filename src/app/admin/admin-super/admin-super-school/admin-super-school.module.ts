import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {MomentModule} from 'angular2-moment';

import {AddressService} from '../../../shared/services/address.service';
import {SchoolService} from '../../../shared/services/school.service';
import {UserService} from '../../../shared/services/user.service';
import {AdminSuperSchoolComponent} from './admin-super-school.component';
import {AdminSuperSchoolAddComponent} from './admin-super-school-add/admin-super-school-add.component';
import {AdminSuperSchoolViewComponent} from './admin-super-school-view/admin-super-school-view.component';
import {AdminSuperSchoolEditComponent} from './admin-super-school-edit/admin-super-school-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSuperSchoolComponent,
    children: [
      {
        path: 'add',
        component: AdminSuperSchoolAddComponent,
        data: {
          heading: 'Add School'
        }
      },
      {
        path: 'view',
        component: AdminSuperSchoolViewComponent,
        data: {
          heading: 'View School'
        }
      },
      {
        path: 'edit/:schoolId',
        component: AdminSuperSchoolEditComponent,
        data: {
          heading: 'Edit School'
        }
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
    SchoolService,
    UserService
  ],
  declarations: [
    AdminSuperSchoolComponent,
    AdminSuperSchoolAddComponent,
    AdminSuperSchoolViewComponent,
    AdminSuperSchoolEditComponent]
})
export class AdminSuperSchoolModule {
}
