import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NoticeService} from '../../../shared/services/notice.service';
import {StaffService} from '../../../shared/services/staff.service';
import {SchoolService} from '../../../shared/services/school.service';
import {LibrarianService} from '../../../shared/services/librarian.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GSettingsService} from '../../../shared/services/g-settings.service';
import {SchoolLibrarianDashboardComponent} from './school-librarian-dashboard.component';
import {SchoolLibrarianDashboardRoutes} from './school-librarian-dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SchoolLibrarianDashboardRoutes),
    NgxChartsModule
  ],
  providers: [
    NoticeService,
    StaffService,
    SchoolService,
    GSettingsService,
    LibrarianService],

  declarations: [SchoolLibrarianDashboardComponent]
})
export class SchoolLibrarianDashboardModule {
}
