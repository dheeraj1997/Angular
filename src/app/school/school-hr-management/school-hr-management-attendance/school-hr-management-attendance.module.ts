import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SchoolHrManagementAttendanceComponent } from './school-hr-management-attendance.component';
import { SchoolHrManagementAttendanceTakeComponent } from './school-hr-management-attendance-take/school-hr-management-attendance-take.component';
import { SchoolHrManagementAttendanceViewComponent } from './school-hr-management-attendance-view/school-hr-management-attendance-view.component';
import { SchoolHrManagementAttendanceAddComponent } from './school-hr-management-attendance-add/school-hr-management-attendance-add.component';

const routes: Routes = [{
	path: '',
	component: SchoolHrManagementAttendanceComponent, 
	children: [{
		path: 'add',
		component: SchoolHrManagementAttendanceAddComponent,
		data: {
			heading: 'Add Attendance'
		}
	},
		{
			path: 'take',
			component: SchoolHrManagementAttendanceTakeComponent,
			data: {
				heading: 'Take Attendance'
			}
		},
	    {
		path: 'view',
			component: SchoolHrManagementAttendanceViewComponent,
			data: {
				heading: 'View Attendance'

			},
	}]
}];
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
	  FormsModule,
	  RouterModule.forChild(routes)
  ],
  declarations: [
   SchoolHrManagementAttendanceComponent,
   SchoolHrManagementAttendanceTakeComponent, 
   SchoolHrManagementAttendanceViewComponent,
   SchoolHrManagementAttendanceAddComponent
   ]
})
export class SchoolHrManagementAttendanceModule { }
