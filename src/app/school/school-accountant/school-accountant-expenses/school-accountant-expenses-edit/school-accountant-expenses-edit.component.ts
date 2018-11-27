import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router, ActivatedRoute} from '@angular/router';
import {SchoolService} from '../../../../shared/services/school.service';
import {StaffService} from '../../../../shared/services/staff.service';
import {ExpensesService} from '../../../../shared/services/expenses.service';

const ls = localStorage;

@Component({
  selector: 'app-school-accountant-expenses-edit',
  templateUrl: './school-accountant-expenses-edit.component.html',
  styleUrls: ['./school-accountant-expenses-edit.component.scss']
})
export class SchoolAccountantExpensesEditComponent implements OnInit {
  expenseData = {
    particular: '',
    category : '',
    schoolId: '',
    expensesDate: {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      day: (new Date).getDate()
    },
    amount: '',
    comment: '',
    createdById: '',
  };
  staffData = {
    _id: '',
  }
  schoolData = {
    _id:'',
  }
  userData = JSON.parse(ls.getItem('userData'));
  expenseCategory = [];
  constructor(private school: SchoolService,
    private staff: StaffService,
    private router: Router,
    private alert: ToastrService,
    private expenses: ExpensesService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const expenseId = params['expenseId'];
      console.log('expenseId', expenseId);
      this.expenses.getExpensesById(expenseId)
      .map(x => x.json())
      .subscribe(res => {
        console.log('examRes', res);
        if (res.success) {
          this.expenseData = res.data;
          console.log('expenseData', this.expenseData)
        } else {
          this.alert.error(res.error, 'Fatal Error!');
        }
      }, err => {
        this.alert.error('Something went wrong!', 'Fatal Error!');
        this.router.navigate(['/school/accountant/expenses/view']);
      })
    });

    this.userData = JSON.parse(ls.getItem('userData'));
    this.staff.getStaffByLoginId(this.userData._id.toString())
    .map(x => x.json())
    .subscribe(res => {
      console.log('staffres', res);
      if (res && res.data && res.data._id) {
        this.staffData = res.data;
        this.expenseData.createdById = res.data._id;
        if (res.data.schoolId) {
          this.expenseData.schoolId = res.data.schoolId;
          console.log('expenseData', this.expenseData);
          
          this.school.getSchoolById(res.data.schoolId)
          .map(x => x.json())
          .subscribe(scRes => {
            console.log('scRes', scRes);
            if (scRes.success) {
              this.schoolData = scRes.data;
              this.getCategory();
            }
            else {
              this.alert.error('Not able to fetch school information!', 'Reload Page');
            }
          })
        }

      } else {
        this.alert.error('Not able to fetch staff information!', 'Reload Page');
      }
    })
  }
  getCategory(){
    this.expenses.getExpensesCategoryBySchoolId(this.schoolData._id)
    .map(x => x.json())
    .subscribe(expensesCategoryRes => {
      console.log('expensesCategoryRes', expensesCategoryRes);
      if (expensesCategoryRes.success) {
        this.expenseCategory = expensesCategoryRes.data;
      }
    })
  }
  submitExpense() {
    console.log('expenseData', this.expenseData)
    if (
      !this.expenseData.particular ||
      !this.expenseData.schoolId ||
      !this.expenseData.expensesDate ||
      !this.expenseData.amount ||
      !this.expenseData.comment||
      !this.expenseData.category
      ) {
      this.alert.error('Data Incomplete', 'Error');
    return;
  }
  this.expenses.editExpenses(this.expenseData)
  .map(x => x.json())
  .subscribe(res => {

    console.log('res', res);
    this.alert.success(res.message, 'Success');
    this.router.navigate(['/school/accountant/expenses/view']);
    console.log('save works', this.expenseData);
  });
}
}

