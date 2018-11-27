import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchoolLibrarianBooksComponent} from './school-librarian-books.component';
import {SchoolLibrarianBooksAddComponent} from './school-librarian-books-add/school-librarian-books-add.component';
import {SchoolLibrarianBooksViewComponent} from './school-librarian-books-view/school-librarian-books-view.component';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SchoolService} from '../../../shared/services/school.service';
import {ClassService} from '../../../shared/services/class.service';
import {StudentService} from '../../../shared/services/student.service';
import {LibrarianService} from '../../../shared/services/librarian.service';
import {StaffService} from '../../../shared/services/staff.service';
import { SchoolLibrarianBooksEditComponent } from './school-librarian-books-edit/school-librarian-books-edit.component';

const routes: Routes = [{
  path: '',
  component: SchoolLibrarianBooksComponent,
  children: [{
    path: 'add',
    component: SchoolLibrarianBooksAddComponent
  }, {
    path: 'view',
    component: SchoolLibrarianBooksViewComponent
  },{
    path: 'edit/:bookId',
    component: SchoolLibrarianBooksEditComponent
  }]
}];

@NgModule({
  imports: [
    CommonModule,
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
    SchoolLibrarianBooksComponent,
    SchoolLibrarianBooksAddComponent,
    SchoolLibrarianBooksViewComponent,
    SchoolLibrarianBooksEditComponent,
  ]
})
export class SchoolLibrarianBooksModule {
}
