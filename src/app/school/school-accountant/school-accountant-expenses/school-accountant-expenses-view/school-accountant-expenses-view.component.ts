import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';
import {ExpensesService} from '../../../../shared/services/expenses.service';
import {StaffService} from '../../../../shared/services/staff.service';

const ls = localStorage;

@Component({
  selector: 'app-school-accountant-expenses-view',
  templateUrl: './school-accountant-expenses-view.component.html',
  styleUrls: ['./school-accountant-expenses-view.component.scss']
})
export class SchoolAccountantExpensesViewComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  toShowData = [];
  searchString: string;
  initialData: string;
  schoolData: any;
  nameToDelete: any;
  staffData = {
    _id: ''
  };

  constructor(private school: SchoolService,
              private expenses: ExpensesService,
              private modalService: NgbModal,
              private router: Router,
              private alert: ToastrService,
              private staff: StaffService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.staff.getStaffByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('staffres', res);
        if (res && res.data && res.data._id) {
          this.staffData = res.data;
          if (res.data.schoolId) {
            this.expenses.getExpensesBySchoolId(res.data.schoolId)
              .map(x => x.json())
              .subscribe(expensesRes => {
                console.log('expensesRes', expensesRes);
                if (expensesRes.success) {
                  this.toShowData = expensesRes.data;
                  this.initialData = JSON.stringify(expensesRes.data);
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

  search(e) {
    console.log('e', e);
    if (e) {
      const pattern = new RegExp(e, 'i');
      this.toShowData = this.toShowData.filter(val => {
        return pattern.test(val.particular);
      });
      if (!this.toShowData.length) {
        this.toShowData = JSON.parse(this.initialData);
      }
    } else {
      this.toShowData = JSON.parse(this.initialData);
    }
  }

  delete(expense, index, content) {
    this.nameToDelete = expense.particular;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        console.log('expenseId', expense._id);
        this.expenses.deleteExpenses(expense._id)
          .map(x => x.json())
          .subscribe(res => {
            console.log('res', res);
            console.log('expense', expense._id);
            if (res.success) {
              this.toShowData.splice(index, 1);
              this.alert.success('expense' + ' deleted successfully!', 'Success!');
            } else {
              this.alert.error('Something went wrong!', 'Error!!');
            }
          });
      } else if (result === 'cancel') {
        this.alert.info('expense' + ' not deleted!', 'Information!');
      } else {
        this.alert.error('expense' + ' not deleted!', 'Error!');
      }
    }, (reason) => {
      this.alert.info('expense' + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'clicking on a background!';
    } else {
      return `${reason}`;
    }
  }

}
