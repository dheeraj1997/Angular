import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchoolLibrarianManageComponent} from './school-librarian-manage.component';
import {SchoolLibrarianManageIssueComponent} from './school-librarian-manage-issue/school-librarian-manage-issue.component';
import {SchoolLibrarianManageReturnComponent} from './school-librarian-manage-return/school-librarian-manage-return.component';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SchoolService} from '../../../shared/services/school.service';
import {ClassService} from '../../../shared/services/class.service';
import {StudentService} from '../../../shared/services/student.service';
import {LibrarianService} from '../../../shared/services/librarian.service';
import {StaffService} from '../../../shared/services/staff.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SchoolLibrarianManageIssueBookComponent } from './school-librarian-manage-issue-book/school-librarian-manage-issue-book.component';

const routes: Routes = [{
  path: '',
  component: SchoolLibrarianManageComponent,
  children: [ {
    path: 'issueBook',
    component: SchoolLibrarianManageIssueBookComponent
  },
  {
    path: 'issue/:bookId',
    component: SchoolLibrarianManageIssueComponent
  }, {
    path: 'return',
    component: SchoolLibrarianManageReturnComponent
  }]
}];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],

  providers:[
  SchoolService,
  ClassService,
  StudentService,
  LibrarianService,
  StaffService
  ],

  declarations: [
    SchoolLibrarianManageComponent,
    SchoolLibrarianManageIssueComponent,
    SchoolLibrarianManageReturnComponent,
    SchoolLibrarianManageIssueBookComponent,
  ]
})

export class SchoolLibrarianManageModule {
}
