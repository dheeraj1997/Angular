import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

import { SchoolHrManagementMessagingComponent } from './school-hr-management-messaging.component';

const routes: Routes = [
	{
		path: '',
		component: SchoolHrManagementMessagingComponent,
		data: {
			heading: 'Messaging'
		}
	}
];

@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes),
	  NgxChartsModule
  ],
	declarations: [SchoolHrManagementMessagingComponent]
})
export class SchoolHrManagementMessagingModule { }
