import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {CsvService} from '../../../shared/services/csv.service';
import {StaffService} from '../../../shared/services/staff.service';
import {SchoolService} from '../../../shared/services/school.service';
import {ClassService} from '../../../shared/services/class.service';
import {SessionService} from '../../../shared/services/session.service';
import {StudentService} from '../../../shared/services/student.service';

import {SchoolAccountantLedgerComponent} from './school-accountant-ledger.component';

const routes: Routes = [{
  path: '',
  component: SchoolAccountantLedgerComponent,
  data: {
    heading: 'Fees Ledger'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CsvService,
    StaffService,
    ClassService,
    StudentService,
    SessionService,
    SchoolService
  ],

  declarations: [SchoolAccountantLedgerComponent]
})
export class SchoolAccountantLedgerModule {
}
