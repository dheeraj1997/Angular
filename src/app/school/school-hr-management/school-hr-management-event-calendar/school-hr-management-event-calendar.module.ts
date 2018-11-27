import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { SchoolHrManagementEventCalendarComponent } from './school-hr-management-event-calendar.component';

const routes: Routes = [
	{
		path: '',
		component: SchoolHrManagementEventCalendarComponent,
		data: {
			heading: 'Event Calendar'
		}
	}
];

@NgModule({
  imports: [
	CommonModule,
	NgbModule,
	RouterModule.forChild(routes),
	CalendarModule.forRoot(),
	FormsModule],
  declarations: [SchoolHrManagementEventCalendarComponent]
})
export class SchoolHrManagementEventCalendarModule { }
