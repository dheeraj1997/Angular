import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AddressService} from '../../../../shared/services/address.service';
import {SchoolService} from '../../../../shared/services/school.service';
import {TeacherService} from '../../../../shared/services/teacher.service';
import {StudentService} from '../../../../shared/services/student.service';
import {ClassService} from '../../../../shared/services/class.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-teacher-edit',
  templateUrl: './school-admin-teacher-edit.component.html',
  styleUrls: ['./school-admin-teacher-edit.component.scss']
})
export class SchoolAdminTeacherEditComponent implements OnInit {


  schoolData = {
    _id: ''
  };
  userData = JSON.parse(ls.getItem('userData'));
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
  };
  isDisable = false;
  constructor(private address: AddressService,
              private school: SchoolService,
              private teacher: TeacherService,
              private cls: ClassService,
              private route: ActivatedRoute,
              private router: Router,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const teacherId = params['teacherId'];
      console.log('teacherId', teacherId);
      this.teacher.getTeacherById(teacherId)
        .map(x => x.json())
        .subscribe(tres => {
          console.log('tres', tres);
          if (tres.success) {
            this.teacherData = tres.data;
            console.log('tres.data', tres.data);
          } else {
            this.alert.error(tres.error, 'Fatal Error!');
          }
        }, err => {
          this.alert.error('Something went wrong!', 'Fatal Error!');
          this.router.navigate(['/school/admin/notice/view'])
        })
    });
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
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
    if (
      !this.teacherData.name
    ) {
      this.alert.error('Required fields are empty!', 'Fatal Error');
      return;
    } else {
      this.teacher.editTeacher(this.teacherData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          this.alert.success(res.message, 'Success');
          this.router.navigate(['/school/admin/teacher/view']);
        }, err => {
          this.isDisable = false;
          err = err.json();
          console.log('err', err);
          this.alert.error(err.error, 'Error');
        })
    }
  }
}
