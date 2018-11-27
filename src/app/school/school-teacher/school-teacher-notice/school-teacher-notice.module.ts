import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NoticeService} from '../../../shared/services/notice.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {SchoolService} from '../../../shared/services/school.service';

import {SchoolTeacherNoticeComponent} from './school-teacher-notice.component';

const routes: Routes = [{
  path: '',
  component: SchoolTeacherNoticeComponent,
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
  providers: [
    NoticeService,
    TeacherService,
    SchoolService
  ],
  declarations: [SchoolTeacherNoticeComponent]
})
export class SchoolTeacherNoticeModule {
}
