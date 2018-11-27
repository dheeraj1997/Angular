import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {CommonModule} from '@angular/common';
import {SchoolHrManagementDashboardComponent} from './school-hr-management-dashboard.component';

import {NoticeService} from '../../../shared/services/notice.service';
import {StaffService} from '../../../shared/services/staff.service';
import {SchoolService} from '../../../shared/services/school.service';

const routes: Routes = [
  {
    path: '',
    component: SchoolHrManagementDashboardComponent,
    data: {
      heading: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxChartsModule
  ],
  declarations: [SchoolHrManagementDashboardComponent],
  providers: [
    NoticeService,
    StaffService,
    SchoolService]
})
export class SchoolHrManagementDashboardModule {
}
