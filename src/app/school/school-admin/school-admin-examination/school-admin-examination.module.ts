import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SchoolService} from '../../../shared/services/school.service';
import {SessionService} from '../../../shared/services/session.service';
import {SubjectService} from '../../../shared/services/subject.service';
import {ClassService} from '../../../shared/services/class.service';
import {ExaminationService} from '../../../shared/services/examination.service';
import {SchoolAdminExaminationComponent} from './school-admin-examination.component';
import {SchoolAdminExaminationAddComponent} from './school-admin-examination-add/school-admin-examination-add.component';
import {SchoolAdminExaminationViewComponent} from './school-admin-examination-view/school-admin-examination-view.component';
import {SchoolAdminExaminationEditComponent} from './school-admin-examination-edit/school-admin-examination-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAdminExaminationComponent,

    children: [
      {
        path: 'add',
        component: SchoolAdminExaminationAddComponent,
        data: {
          heading: 'Add Examination'
        }

      },
      {
        path: 'view',
        component: SchoolAdminExaminationViewComponent,
        data: {
          heading: 'View Examination'
        }
      }, {
        path: 'edit/:examId',
        component: SchoolAdminExaminationEditComponent,
        data: {
          heading: 'Edit Examination'
        }
      }
    ]
  }];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SchoolService,
    SubjectService,
    ClassService,
    SessionService,
    ExaminationService
  ],
  declarations: [
    SchoolAdminExaminationComponent,
    SchoolAdminExaminationAddComponent,
    SchoolAdminExaminationViewComponent,
    SchoolAdminExaminationEditComponent
  ]
})
export class SchoolAdminExaminationModule {
}
