import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule, Routes } from '@angular/router';
import { SchoolAccountantReportComponent } from './school-accountant-report.component';

const routes: Routes = [
	{
		path: '',
		component: SchoolAccountantReportComponent,
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
  declarations: [SchoolAccountantReportComponent]
})
export class SchoolAccountantReportModule { }
