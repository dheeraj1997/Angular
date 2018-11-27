import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AddressService} from '../../../../shared/services/address.service';
import {SchoolService} from '../../../../shared/services/school.service';
import {TeacherService} from '../../../../shared/services/teacher.service';
import {StudentService} from '../../../../shared/services/student.service';
import {ClassService} from '../../../../shared/services/class.service';
import {StaffService} from '../../../../shared/services/staff.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-staff-edit',
  templateUrl: './school-admin-staff-edit.component.html',
  styleUrls: ['./school-admin-staff-edit.component.scss']
})
export class SchoolAdminStaffEditComponent implements OnInit {

  schoolData = {
    _id: ''
  };
  userData = {
    _id: ''
  };
  staffData = {
    name: '',
    type: '',
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
    gender: '',
    aadhaarId: '',
    emergencyContactNo:'',
    bloodGroup: '',
    createdById: '',
    schoolId: '',
    username: '',
    password: ''
  };
  confirmPass = '';
  classData = [];
  typeData = ['accountant', 'librarian', 'hr', 'other'];
  isDisable = false;

  constructor(private address: AddressService,
              private school: SchoolService,
              private cls: ClassService,
              private staff: StaffService,
              private router: Router,
              private alert: ToastrService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const staffId = params['staffId'];
      console.log('staffIdthis', staffId);
      this.staff.getStaffById(staffId)
      .map(x => x.json())
      .subscribe(res => {
        console.log('examRes', res);
        if (res.success) {
          this.staffData = res.data;
          console.log('staffData', this.staffData)
        } else {
          this.alert.error(res.error, 'Fatal Error!');
        }
      }, err => {
        this.alert.error('Something went wrong!', 'Fatal Error!');
         this.router.navigate(['/school/admin/staff/view']);
      })
    });
    this.userData = JSON.parse(ls.getItem('userData'));
    this.staffData.createdById = this.userData._id.toString();
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.staffData.schoolId = this.schoolData._id.toString();
          this.cls.getClassBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res2 => {
              console.log('res2', res2);
              if (res2.data && res2.data.length) {
                this.classData = res2.data;
              } else {
                this.alert.error('Not able to fetch class information!');
              }
            })
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  getDetailsFromPin(e) {
    if (e.length === 6) {
      this.address.getAddressByPin(e)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          this.staffData.address.district = res.District;
          this.staffData.address.state = res.State;
          this.alert.success('Fetched info from pin code', 'Success');
        }, err => {
          console.log('err', err);
          this.alert.error('Can\'t find information from pin code!', 'Error');
        });
    }
  }

  passConfirmCheck() {
    if (this.confirmPass !== this.staffData.password) {
      this.alert.error('Password do not match', 'Confirm Error');
    } else {
      this.alert.success('Password match successful!', 'Success');
    }
  }

  addPhone() {
    this.staffData.contact.phone.push('');
  }

  addEmail() {
    this.staffData.contact.email.push('');
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  submitStaff() {
          this.isDisable = true;
    console.log('this.staffData', this.staffData);
    if (
      !this.staffData.name
    ) {
      this.alert.error('Required fields are empty!', 'Fatal Error');
      return;
    } else if (!this.staffData.contact || !this.staffData.contact.phone[0]) {
      this.alert.error('Required fields are empty!', 'Fatal Error');
      return;
    } else {
      this.staffData.emergencyContactNo = this.staffData.contact.phone[0];
      this.staff.editStaff(this.staffData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          this.alert.success(res.message, 'Success');
          this.router.navigate(['/school/admin/staff/view']);
        }, err => {
          this.isDisable = false;
          err = err.json();
          console.log('err', err);
          this.alert.error(err.error, 'Error');
        })
    }
  }
}
