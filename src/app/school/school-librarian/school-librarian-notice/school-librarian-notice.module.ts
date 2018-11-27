import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NoticeService} from '../../../shared/services/notice.service';
import {StaffService} from '../../../shared/services/staff.service';
import {SchoolService} from '../../../shared/services/school.service';

import { SchoolLibrarianNoticeComponent } from './school-librarian-notice.component';

const routes: Routes = [{
   path: '',
  component: SchoolLibrarianNoticeComponent,
    data: {
        heading: 'Notice'
      }
}];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers:[
  NoticeService,
  StaffService,
  SchoolService
  ],
  declarations: [SchoolLibrarianNoticeComponent]
})
export class SchoolLibrarianNoticeModule { }
