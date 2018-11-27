import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GoogleAnalyticsEventsService} from '../../../../shared/services/google-analytics-events.service';
import {AddressService} from '../../../../shared/services/address.service';
import {EmployeeService} from '../../../../shared/services/employee.service';
import {UserService} from '../../../../shared/services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

const ls = localStorage;

@Component({
  selector: 'app-admin-super-employee-view',
  templateUrl: './admin-super-employee-view.component.html',
  styleUrls: ['./admin-super-employee-view.component.scss']
})
export class AdminSuperEmployeeViewComponent implements OnInit {
  employeeList = [];
  initialData: string;
  searchString: string;
  nameToDelete = '';
  nameToChange = '';
  pass = '';
  repass = '';

  constructor(private employee: EmployeeService,
              private router: Router,
              private user: UserService,
              private address: AddressService,
              private gaEvent: GoogleAnalyticsEventsService,
              private modalService: NgbModal,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.employee.getAll()
      .map(x => x.json())
      .subscribe(res => {
        this.employeeList = res.data;
        console.log('schoolList', this.employeeList)
        this.initialData = JSON.stringify(res.data);
        this.alert.success('Employee' + ' fetched');
      })
  }

  delete(employee, index, content) {
    this.nameToDelete = employee.name;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        this.employee.deleteEmployee(employee._id)
          .map(x => x.json())
          .subscribe(res => {
            console.log('deleteRes', res);
            if (res.success) {
              this.employeeList.splice(index, 1);
              this.alert.success(employee.name + ' deleted successfully!', 'Success!');
            } else {
              this.alert.error('Something went wrong!', 'Error!!');
            }
          });
      } else if (result === 'cancel') {
        this.alert.info(employee.name + ' not deleted!', 'Information!');
      } else {
        this.alert.error(employee.name + ' not deleted!', 'Error!');
      }
    }, (reason) => {
      this.alert.info(employee.name + ` not deleted due to ${this.getDismissReason(reason)}`, 'Information!');
    });
  }

  changePassword(employee, content) {
    this.nameToChange = employee.name;
    this.modalService.open(content)
      .result.then((result) => {
      if (result === 'yes') {
        if (this.pass.length && this.pass === this.repass) {
          this.user.changePassword(employee.loginId, {password: this.pass})
            .map(x => x.json())
            .subscribe(res => {
              console.log('res', res);
              if (res.success) {
                this.pass = '';
                this.repass = '';
                this.alert.success(res.message, 'Success!!');
              }
            })
        } else {
          if (!this.pass.length) {
            this.alert.error('Password is empty!');
          } else {
            this.alert.error('Password do not match with confirm password!');
          }
        }
      } else {
        this.alert.info('password not changed!', 'Info!');
      }
    }, (reason) => {
      this.alert.info(`password not changed due to ${this.getDismissReason(reason)}`, 'Info!');
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

  search(e) {
    console.log('e', e);
    if (e) {
      const pattern = new RegExp(e, 'i');
      this.employeeList = this.employeeList.filter(val => {
        return pattern.test(val.name);
      });
      if (!this.employeeList.length) {
        this.employeeList = JSON.parse(this.initialData);
      }
    } else {
      this.employeeList = JSON.parse(this.initialData);
    }
  }

  submitEvent(category, action, label?, value?) {
    this.gaEvent.emitEvent(category, action, label, value);
  }
}
