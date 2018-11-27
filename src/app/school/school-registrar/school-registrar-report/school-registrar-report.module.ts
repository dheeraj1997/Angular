import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SchoolService} from '../../../shared/services/school.service';
import { SchoolRegistrarReportComponent } from './school-registrar-report.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolRegistrarReportComponent,
    data: {
      heading: 'Report'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SchoolService
  ],
  declarations: [SchoolRegistrarReportComponent]
})
export class SchoolRegistrarReportModule { }
