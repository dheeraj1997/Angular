import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchoolService} from '../../../shared/services/school.service';
import {StaffService} from '../../../shared/services/staff.service';
import {ExpensesService} from '../../../shared/services/expenses.service';
import {SchoolAccountantExpensesComponent} from './school-accountant-expenses.component';
import {SchoolAccountantExpensesAddComponent} from './school-accountant-expenses-add/school-accountant-expenses-add.component';
import {SchoolAccountantExpensesEditComponent} from './school-accountant-expenses-edit/school-accountant-expenses-edit.component';
import {SchoolAccountantExpensesViewComponent} from './school-accountant-expenses-view/school-accountant-expenses-view.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Routes, RouterModule} from '@angular/router';
import { SchoolAccountantExpensesCatagoryComponent } from './school-accountant-expenses-catagory/school-accountant-expenses-catagory.component';

const routes: Routes = [{
  path: '',
  component: SchoolAccountantExpensesComponent,
  children: [{
    path: 'add',
    component: SchoolAccountantExpensesAddComponent,
    data: {
      heading: 'Add Expenses'
    }
  }, {
    path: 'view',
    component: SchoolAccountantExpensesViewComponent,
    data: {
      heading: 'View Expenses'
    }
  }, {
    path: 'category',
    component: SchoolAccountantExpensesCatagoryComponent,
    data: {
      heading: 'Expenses Category'
    }
  },
   {
    path: 'edit/:expenseId',
    component: SchoolAccountantExpensesEditComponent,
    data: {
      heading: 'Edit Expenses'
    }
  }]
}];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    StaffService,
    SchoolService,
    ExpensesService
  ],
  declarations: [
    SchoolAccountantExpensesComponent,
    SchoolAccountantExpensesAddComponent,
    SchoolAccountantExpensesViewComponent,
    SchoolAccountantExpensesEditComponent,
    SchoolAccountantExpensesCatagoryComponent]
})
export class SchoolAccountantExpensesModule {
}
