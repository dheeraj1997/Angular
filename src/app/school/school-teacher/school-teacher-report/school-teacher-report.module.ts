import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchoolTeacherReportComponent} from './school-teacher-report.component';
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [{
  path: '',
  component: SchoolTeacherReportComponent,
	data: {
		heading: 'Report'

	}
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SchoolTeacherReportComponent]
})
export class SchoolTeacherReportModule {
}
