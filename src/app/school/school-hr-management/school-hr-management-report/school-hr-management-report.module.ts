import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SchoolHrManagementReportComponent } from './school-hr-management-report.component';

const routes: Routes = [
	{
		path: '',
		component: SchoolHrManagementReportComponent,
		data: {
			heading: 'Report'
		}
	}
];
@NgModule({
  imports: [
    CommonModule,
	  RouterModule.forChild(routes),

  ],
  declarations: [SchoolHrManagementReportComponent]
})
export class SchoolHrManagementReportModule { }
