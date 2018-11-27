import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';

import {ClassService} from '../../../../shared/services/class.service';
import {StudentService} from '../../../../shared/services/student.service';

import {SchoolService} from '../../../../shared/services/school.service';
import {SessionService} from '../../../../shared/services/session.service'
import {SchoolAdminMasterEntryFeeComponent} from './school-admin-master-entry-fee.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolAdminMasterEntryFeeComponent,
    data: {
      heading: 'Add Fees Structure'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    MomentModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SchoolService,
    ClassService,
    StudentService,
    SessionService
  ],
  declarations: [
    SchoolAdminMasterEntryFeeComponent
  ]
})

export class SchoolAdminMasterEntryFeeModule {
}
