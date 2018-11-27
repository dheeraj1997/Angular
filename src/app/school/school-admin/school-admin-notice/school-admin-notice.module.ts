import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NoticeService} from '../../../shared/services/notice.service';

import {SchoolService} from '../../../shared/services/school.service';
import {SubjectService} from '../../../shared/services/subject.service';
import {ClassService} from '../../../shared/services/class.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {TimeTableService} from '../../../shared/services/timeTable.service';
import {SchoolAdminNoticeComponent} from './school-admin-notice.component';
import {SchoolAdminNoticeAddComponent} from './school-admin-notice-add/school-admin-notice-add.component';
import {SchoolAdminNoticeViewComponent} from './school-admin-notice-view/school-admin-notice-view.component';
import {SchoolAdminNoticeEditComponent} from './school-admin-notice-edit/school-admin-notice-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAdminNoticeComponent,

    children: [
      {
        path: 'add',
        component: SchoolAdminNoticeAddComponent,
        data: {
          heading: 'Add Notice'
        }

      },
      {
        path: 'view',
        component: SchoolAdminNoticeViewComponent,
        data: {
          heading: 'View Notice'
        }
      }, {
        path: 'edit/:noticeId',
        component: SchoolAdminNoticeEditComponent,
        data: {
          heading: 'Edit Notice'
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
    ClassService,
    SubjectService,
    TimeTableService,
    NoticeService
  ],

  declarations: [
    SchoolAdminNoticeComponent,
    SchoolAdminNoticeAddComponent,
    SchoolAdminNoticeViewComponent,
    SchoolAdminNoticeEditComponent
  ]
})
export class SchoolAdminNoticeModule {
}
