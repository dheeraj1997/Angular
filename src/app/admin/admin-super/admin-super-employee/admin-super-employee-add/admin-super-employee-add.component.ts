import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GoogleAnalyticsEventsService} from '../../../../shared/services/google-analytics-events.service';
import {AddressService} from '../../../../shared/services/address.service';
import {EmployeeService} from '../../../../shared/services/employee.service';


const ls = localStorage;

@Component({
  selector: 'app-admin-super-employee-add',
  templateUrl: './admin-super-employee-add.component.html',
  styleUrls: ['./admin-super-employee-add.component.scss']
})
export class AdminSuperEmployeeAddComponent implements OnInit {
  userData = {
    _id: ''
  };
  employeeData = {
    name: '',
    address: {
      village: '',
      block: '',
      district: '',
      state: '',
      country: 'india',
      pin: '',
      completeAddress: ''
    },
    contact: {
      phone: [''],
      email: ['']
    },
    hr: {
      panNo: '',
      exp: '',
      salary: '',
      designation: ''
    },
    gender: '',
    aadhaarId: '',
    bloodGroup: '',
    createdById: '',

    username: '',
    password: ''
  };
  confirmPass = '';


  constructor(private alert: ToastrService,
              private router: Router,
              private address: AddressService,
              private gaEvent: GoogleAnalyticsEventsService,
              private employee: EmployeeService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.employeeData.createdById = this.userData._id.toString()
  }

  getDetailsFromPin(e) {
    if (e.length === 6) {
      this.address.getAddressByPin(e)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res) {
            this.employeeData.address.district = res.District;
            this.employeeData.address.state = res.State;
            this.alert.success('Fetched info from pin code', 'Success');
          } else {
            this.alert.error('Can\'t find information from pin code!', 'Error');
          }
        }, err => {
          console.log('err', err);
          this.alert.error('Can\'t find information from pin code!', 'Error');
        });
    }
  }

  addPhone() {
    this.employeeData.contact.phone.push('');
  }

  addEmail() {
    this.employeeData.contact.email.push('');
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  submitEmployee() {
    console.log('employeeData', this.employeeData);
    if (
      !this.employeeData.name ||
      !this.employeeData.contact.phone[0] ||
      // !this.employeeData.contact.email[0] ||
      // !this.employeeData.address.pin ||
      // !this.employeeData.address.district ||
      // !this.employeeData.address.state ||
      // !this.employeeData.address.completeAddress ||
      !this.employeeData.username ||
      !this.employeeData.password
    ) {
      this.alert.error('Required fields Empty');
      return;
    } else {
      this.employee.saveEmployee(this.employeeData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          this.alert.success(res.message, 'Success');
          this.router.navigate(['/admin/super/employee/view'])
        }, err => {
          err = err.json();
          console.log('err', err);
          this.alert.error(err.error, 'Error');
        })
    }
  }

  submitEvent(category, action, label?, value?) {
    this.gaEvent.emitEvent(category, action, label, value);
  }
}
