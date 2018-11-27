import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {AddressService} from '../../../../shared/services/address.service';
import {SessionService} from '../../../../shared/services/session.service';
import {SchoolService} from '../../../../shared/services/school.service';
import {StudentService} from '../../../../shared/services/student.service';
import {ClassService} from '../../../../shared/services/class.service';
import {StaffService} from '../../../../shared/services/staff.service';
import {UserService} from '../../../../shared/services/user.service';

const ls = localStorage;

@Component({
  selector: 'app-school-registrar-student-edit',
  templateUrl: './school-registrar-student-edit.component.html',
  styleUrls: ['./school-registrar-student-edit.component.scss']
})
export class SchoolRegistrarStudentEditComponent implements OnInit {
  schoolData = {
    _id: ''
  };
  userData = {
    _id: ''
  };
  staffData = {
    _id: '',
    schoolId: '',
  };
  studentData = {
    name: '',
    picture: 'https://www.nexia-sabt.co.za/wp-content/uploads/2016/05/dummy.jpg',
    motherName: '',
    motherOccupation: '',
    fatherOccupation: '',
    fatherName: '',
    schoolDetail: {
      schoolId: '',
      classId: '',
      sessionId: '',
      admissionNumber: '',
      rollNo: '',
      srnNo: '',
      admissionType: 'paid',
      admissionDiscount: 0.0,
      admissionDate: {
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth() + 1,
        day: (new Date()).getDate()
      }
    },
    address: {
      village: '',
      block: '',
      district: '',
      state: '',
      country: 'india',
      pin: '',
      completeAddress: ''
    },
    dob: {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      day: (new Date()).getDate()
    },
    gender: '',
    aadhaarId: '',
    isHandicapped: false,
    nationality: 'indian',
    religion: '',
    caste: '',
    height: '',
    weight: '',
    bloodGroup: '',
    guardianInfo: {
      name: '',
      relation: 'father',
      aadhaarId: '',
      contactNo: '',
      email: ''
    },
    createdById: '',
    feesData: []
  };
  classData = [];
  sessionData = [];

  constructor(private address: AddressService,
              private school: SchoolService,
              private student: StudentService,
              private cls: ClassService,
              private session: SessionService,
              private router: Router,
              private staff: StaffService,
              private user: UserService,
              private route: ActivatedRoute,
              private config: NgbDatepickerConfig,
              private alert: ToastrService) {
    config.minDate = {year: 1990, month: 1, day: 1};
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userData = JSON.parse(ls.getItem('userData')) || {};
      const studentId = params['studentId'];
      const sessionId = params['sessionId'];
      console.log('studentId', studentId);
      this.student.getStudentById(studentId, sessionId)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.studentData = res.data;
            if (!this.studentData.picture) {
              this.studentData.picture = 'https://www.nexia-sabt.co.za/wp-content/uploads/2016/05/dummy.jpg';
            }
          } else {
            this.alert.error(res.error, 'Fatal Error!');
          }
        }, err => {
          this.alert.error('Something went wrong!', 'Fatal Error!');
          this.router.navigate(['/school/registrar/student/view']);
        })
    });
    this.userData = JSON.parse(ls.getItem('userData'));
    this.staff.getStaffByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('staffres', res);
        if (res && res.data && res.data._id) {
          this.staffData = res.data;
          this.studentData.createdById = res.data._id;
          this.getDetails();
        } else {
          this.alert.error('Not able to fetch staff information!', 'Reload Page');
        }
      })

  }

  getDetails() {
    this.school.getSchoolById(this.staffData.schoolId)
      .map(x => x.json())
      .subscribe(res => {
        console.log('this.staffData.schoolId', this.staffData.schoolId);
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.studentData.schoolDetail.sessionId = res.data.currentSession;
          if (!res.data.currentSession) {
            this.alert.info('No current session found. Please select current session to continue!')
            this.router.navigate(['/school/admin/master/session/view']);
          }
          this.cls.getClassBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res2 => {
              console.log('res2', res2);
              if (res2.data && res2.data.length) {
                this.classData = res2.data;
              } else {
                this.alert.error('Not able to fetch class information!');
              }
            });
          this.session.getSessionBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res3 => {
              console.log('res3', res3);
              if (res3.success) {
                this.sessionData = res3.data;
                // res3.data.forEach()
                // this.studentData.schoolDetail.sessionId =
              } else {
                this.alert.error('Not able to fetch session information!', 'Fatal Error!');
              }
            });
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
            this.studentData.address.district = res.District;
            this.studentData.address.state = res.State;
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

  getStudentDetailsFromAadhaar(e) {
    if (e.length) {
      this.student.getStudentDetailByAadhaar(e)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.studentData = res.data;
            this.studentData.schoolDetail = {
              schoolId: '',
              classId: '',
              sessionId: '',
              admissionNumber: '',
              rollNo: '',
              srnNo: '',
              admissionType: 'paid',
              admissionDiscount: 0.0,
              admissionDate: {
                year: (new Date()).getFullYear(),
                month: (new Date()).getMonth() + 1,
                day: (new Date()).getDate()
              }
            };
            this.studentData.guardianInfo = {
              name: '',
              relation: 'father',
              aadhaarId: '',
              contactNo: '',
              email: ''
            };
            this.alert.success(res.message, 'Success!');
          } else {
            this.alert.error(res.error, 'Error!!');
          }
        }, err => {
          console.log('err', err);
          this.alert.error('Can\'t find information from aadhaar id!', 'Error!!');
        });
    }
  }

  getGuardianDetailsFromAadhaar(e) {
    if (e.length) {
      this.student.getGuardianByAadhaar(e)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.studentData.guardianInfo = res.data;
            this.alert.success(res.message, 'Success!');
          } else {
            this.alert.error(res.error, 'Error!!');
          }
        }, err => {
          console.log('err', err);
          this.alert.error('Can\'t find information from aadhaar id!', 'Error!!');
        });
    }
  }

  submitStudent() {
    console.log('this.schoolData', this.studentData);
    if (
      !this.studentData.name ||
      !this.studentData.guardianInfo.name ||
      !this.studentData.guardianInfo.relation ||
      !this.studentData.guardianInfo.contactNo ||
      !this.studentData.schoolDetail.classId ||
      !this.studentData.schoolDetail.sessionId ||
      !this.studentData.schoolDetail.admissionNumber ||
      !this.studentData.schoolDetail.admissionType
    ) {
      this.alert.error('Required fields are empty!', 'Fatal Error!');
      return;
    } else {
      this.student.editStudent(this.studentData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          this.alert.success(res.message, 'Success');
          this.router.navigate(['/school/registrar/student/view']);
        }, err => {
          err = err.json();
          console.log('err', err);
          this.alert.error(err.error, 'Error');
        })
    }
  }

  feeOnChange() {
    this.getFeeInfo();
  }

  getFeeInfo() {
    const schoolId = this.schoolData._id;
    const sessionId = this.studentData.schoolDetail.sessionId;
    const classId = this.studentData.schoolDetail.classId;
    if (schoolId && sessionId && classId) {
      this.school.getFees(schoolId, sessionId, classId)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.studentData.feesData = res.data.map(val => {
              delete val._id;
              return val;
            });
          }
        })
    }
  }

  uploadProfilePicture(event) {
    console.log('event', event);
    console.log('event.target.files', event.target.files);
    const fileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData: FormData = new FormData();
      formData.append('profile', file, file.name);
      console.log('formData', formData);
      this.user.uploadProfilePicture(formData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            // this.alert.success(res.message, 'Success!!');
            this.studentData.picture = 'https://inforida.in/profile/' + res.data.name;
          } else {
            this.alert.error('Error in uploading file!', 'Error!!');
          }

        }, err => {
          err = err.json();
          console.log('err', err);
          this.alert.error(err.error, 'Error!!');
        })
    } else {
      this.alert.error('No File selected', 'Error!!');
    }
  }

  clearPicture() {
    this.studentData.picture = 'https://www.nexia-sabt.co.za/wp-content/uploads/2016/05/dummy.jpg';
  }


}



