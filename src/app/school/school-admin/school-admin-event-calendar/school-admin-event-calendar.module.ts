import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {CalendarModule, CalendarDateFormatter} from 'angular-calendar';
import {SchoolAdminEventCalendarComponent} from './school-admin-event-calendar.component';
import {SchoolAdminEventCalendarAddComponent} from './school-admin-event-calendar-add/school-admin-event-calendar-add.component';
import {SchoolAdminEventCalendarViewComponent} from './school-admin-event-calendar-view/school-admin-event-calendar-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolAdminEventCalendarComponent,
    children: [
      {
        path: 'add',
        component: SchoolAdminEventCalendarAddComponent,
        data: {
          heading: 'Add Event\'s'
        }
      },
      {
        path: 'view',
        component: SchoolAdminEventCalendarViewComponent,
        data: {
          heading: 'View Event\'s'
        }
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
    CalendarModule.forRoot(),
    FormsModule],

  declarations: [SchoolAdminEventCalendarComponent, SchoolAdminEventCalendarAddComponent, SchoolAdminEventCalendarViewComponent]
})
export class SchoolAdminEventCalendarModule {
}
