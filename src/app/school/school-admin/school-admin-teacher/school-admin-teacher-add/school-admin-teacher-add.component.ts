import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AddressService} from '../../../../shared/services/address.service';
import {SchoolService} from '../../../../shared/services/school.service';
import {TeacherService} from '../../../../shared/services/teacher.service';
import {StudentService} from '../../../../shared/services/student.service';
import {ClassService} from '../../../../shared/services/class.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-teacher-add',
  templateUrl: './school-admin-teacher-add.component.html',
  styleUrls: ['./school-admin-teacher-add.component.scss']
})
export class SchoolAdminTeacherAddComponent implements OnInit {

  schoolData = {
    _id: ''
  };
  userData = {
    _id: ''
  };
  teacherData = {
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
    gender: '',
    aadhaarId: '',
    bloodGroup: '',
    createdById: '',
    schoolId: '',
    emergencyContactNo: '',
    username: '',
    password: ''
  };
  confirmPass = '';
  classData = [];
  isDisable = false;

  constructor(private address: AddressService,
              private school: SchoolService,
              private teacher: TeacherService,
              private cls: ClassService,
              private router: Router,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.teacherData.createdById = this.userData._id.toString();
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.teacherData.schoolId = this.schoolData._id.toString();
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
          if (res) {
            this.teacherData.address.district = res.District;
            this.teacherData.address.state = res.State;
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
    this.teacherData.contact.phone.push('');
  }

  addEmail() {
    this.teacherData.contact.email.push('');
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  submitTeacher() {
    this.isDisable = true;
    console.log('this.schoolData', this.teacherData);
    if (!this.teacherData.name || !this.teacherData.contact || !this.teacherData.contact.phone[0]) {
      this.alert.error('Required fields are empty!', 'Fatal Error');
      this.isDisable = false;
      return;
    } else {
      this.teacherData.emergencyContactNo = this.teacherData.contact.phone[0];
      this.teacher.saveTeacher(this.teacherData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          this.alert.success(res.message, 'Success');
          this.isDisable = false;
          this.router.navigate(['/school/admin/teacher/view']);
        }, err => {
          this.isDisable = false;
          err = err.json();
          console.log('err', err);
          this.alert.error(err.error, 'Error');
          this.isDisable = false;
        })
    }
  }
}
