import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';

import {SchoolService} from '../../../../shared/services/school.service';
import {SessionService} from '../../../../shared/services/session.service';
import {SchoolAdminMasterEntrySessionComponent} from './school-admin-master-entry-session.component';
import {
  SchoolAdminMasterEntrySessionAddComponent
}
  from './school-admin-master-entry-session-add/school-admin-master-entry-session-add.component';
import {
  SchoolAdminMasterEntrySessionEditComponent
}
  from './school-admin-master-entry-session-edit/school-admin-master-entry-session-edit.component';
import {
  SchoolAdminMasterEntrySessionViewComponent
}
  from './school-admin-master-entry-session-view/school-admin-master-entry-session-view.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolAdminMasterEntrySessionComponent,
    children: [
      {
        path: 'add',
        component: SchoolAdminMasterEntrySessionAddComponent,
        data: {
          heading: 'Add Session'
        }
      }, {
        path: 'view',
        component: SchoolAdminMasterEntrySessionViewComponent,
        data: {
          heading: 'View Session'
        }
      },
      {
        path: 'edit/:sessionId',
        component: SchoolAdminMasterEntrySessionEditComponent,
        data: {
          heading: 'Edit Session'
        }
      },
    ]
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
    SessionService
  ],
  declarations: [
    SchoolAdminMasterEntrySessionComponent,
    SchoolAdminMasterEntrySessionAddComponent,
    SchoolAdminMasterEntrySessionEditComponent,
    SchoolAdminMasterEntrySessionViewComponent,
  ]
})
export class SchoolAdminMasterEntrySessionModule {
}
