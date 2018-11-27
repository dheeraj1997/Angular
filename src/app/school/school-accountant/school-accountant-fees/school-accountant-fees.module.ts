import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';
import {SchoolAccountantFeesComponent} from './school-accountant-fees.component';
import {SessionService} from '../../../shared/services/session.service';
import {SchoolService} from '../../../shared/services/school.service';
import {StaffService} from '../../../shared/services/staff.service';
import {StudentService} from '../../../shared/services/student.service';
import {ClassService} from '../../../shared/services/class.service';
import {SchoolAccountantFeesAddComponent} from './school-accountant-fees-add/school-accountant-fees-add.component';
import {SchoolAccountantFeesViewComponent} from './school-accountant-fees-view/school-accountant-fees-view.component';
import {SchoolAccountantFeesEditComponent} from './school-accountant-fees-edit/school-accountant-fees-edit.component';
import {SchoolAccountantFeesCollectComponent} from './school-accountant-fees-collect/school-accountant-fees-collect.component';
import {Routes, RouterModule} from '@angular/router';
import {SchoolAccountantFeesReceiptComponent} from './school-accountant-fees-receipt/school-accountant-fees-receipt.component';


const routes: Routes = [{
  path: '',
  component: SchoolAccountantFeesComponent,
  children: [{
    path: 'add',
    component: SchoolAccountantFeesAddComponent,
    data: {
      heading: 'Collect Fees'
    }
  }, {
    path: 'view',
    component: SchoolAccountantFeesViewComponent,
    data: {
      heading: 'View Fees'
    }
  }, {
    path: 'edit/:accountantId',
    component: SchoolAccountantFeesEditComponent,
    data: {
      heading: 'Edit Fees'
    }
  }, {
    path: 'collect/:studentId/:sessionId',
    component: SchoolAccountantFeesCollectComponent,
    data: {
      heading: 'Collect Fees'
    }
  }, {
    path: 'receipt/:studentId/:sessionId',
    component: SchoolAccountantFeesReceiptComponent,
    data: {
      heading: 'Receipt'
    }
  }]
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SchoolAccountantFeesComponent,
    SchoolAccountantFeesAddComponent,
    SchoolAccountantFeesViewComponent,
    SchoolAccountantFeesEditComponent,
    SchoolAccountantFeesCollectComponent,
    SchoolAccountantFeesReceiptComponent
  ],
  providers: [
    SessionService,
    SchoolService,
    StaffService,
    StudentService,
    ClassService
  ]
})
export class SchoolAccountantFeesModule {
}
