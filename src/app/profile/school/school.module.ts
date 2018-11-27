import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchoolComponent} from './school.component';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {SchoolService} from '../../shared/services/school.service';

const routes: Routes = [{
  path: ':userName',
  component: SchoolComponent
}];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SchoolComponent],
  providers: [SchoolService]
})
export class SchoolModule {
}
