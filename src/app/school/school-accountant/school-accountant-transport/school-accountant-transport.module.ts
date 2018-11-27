import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Routes, RouterModule} from '@angular/router';
import {SessionService} from '../../../shared/services/session.service';
import {SchoolService} from '../../../shared/services/school.service';
import {StaffService} from '../../../shared/services/staff.service';
import {StudentService} from '../../../shared/services/student.service';
import {ClassService} from '../../../shared/services/class.service';
import {SchoolAccountantTransportComponent} from './school-accountant-transport.component';
import {SchoolAccountantTransportAddComponent} from './school-accountant-transport-add/school-accountant-transport-add.component';
import {SchoolAccountantTransportViewComponent} from './school-accountant-transport-view/school-accountant-transport-view.component';
import {SchoolAccountantTransportEditComponent} from './school-accountant-transport-edit/school-accountant-transport-edit.component';

const routes: Routes = [{
  path: '',
  component: SchoolAccountantTransportComponent,
  children: [{
    path: 'add',
    component: SchoolAccountantTransportAddComponent,
    data: {
      heading: 'Add Transport Fee'
    }
  }, {
    path: 'view',
    component: SchoolAccountantTransportViewComponent,
    data: {
      heading: 'View Transport Fee'
    }
  }, {
    path: 'edit',
    component: SchoolAccountantTransportEditComponent,
    data: {
      heading: 'Edit Transport Fee'
    }
  }]
}];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    StaffService,
    SchoolService,
    SessionService,
    ClassService,
    StudentService
  ],
  declarations: [
    SchoolAccountantTransportComponent,
    SchoolAccountantTransportAddComponent,
    SchoolAccountantTransportViewComponent,
    SchoolAccountantTransportEditComponent
  ]
})
export class SchoolAccountantTransportModule {
}
