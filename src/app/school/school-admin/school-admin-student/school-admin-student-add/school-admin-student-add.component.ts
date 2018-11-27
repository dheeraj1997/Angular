import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {AddressService} from '../../../../shared/services/address.service';
import {SessionService} from '../../../../shared/services/session.service';
import {SchoolService} from '../../../../shared/services/school.service';
import {StudentService} from '../../../../shared/services/student.service';
import {UserService} from '../../../../shared/services/user.service';
import {GSettingsService} from '../../../../shared/services/g-settings.service';
import {ClassService} from '../../../../shared/services/class.service';
import * as moment from 'moment';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-student-add',
  templateUrl: './school-admin-student-add.component.html',
  styleUrls: ['./school-admin-student-add.component.scss']
})
export class SchoolAdminStudentAddComponent implements OnInit {

  schoolData = {
    _id: '',
    currentSession: ''
  };
  userData = {
    _id: ''
  };
  transportFees = {
    particular: 'Transport',
    amount: 0,
    type: 'transport',
    dueDate: '7',
    months: []
  };
  studentData = {
    name: '',
    motherName: '',
    picture: 'https://www.nexia-sabt.co.za/wp-content/uploads/2016/05/dummy.jpg',
    motherOccupation: '',
    fatherOccupation: '',
    fatherName: '',
    isTransport: false,
    transportData: {
      doj: {
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth() + 1,
        day: (new Date()).getDate()
      },
      amount: '',
      route: '',
      vehicleNo: ''
    },
    schoolDetail: {
      schoolId: '',
      classId: '',
      sessionId: '',
      rollNo: '',
      admissionNumber: '',
      srnNo: '',
      admissionType: 'paid',
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
  settingData = {
    feesSettings: {transportSettings: {months: []}}
  };
  isDisable = false;

  constructor(private address: AddressService,
              private school: SchoolService,
              private student: StudentService,
              private cls: ClassService,
              private setting: GSettingsService,
              private session: SessionService,
              private user: UserService,
              private router: Router,
              private config: NgbDatepickerConfig,
              private alert: ToastrService) {
    config.minDate = {year: 1990, month: 1, day: 1};
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.studentData.createdById = this.userData._id.toString();
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
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
              }
            });
          this.setting.getSettings(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res3 => {
              console.log('res3', res3);
              if (res3.success) {
                this.settingData = res3.data;
                // res3.data.forEach()
                // this.studentData.schoolDetail.sessionId =
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
            const temp = JSON.parse(JSON.stringify(res.data));
            temp.feesData = JSON.parse(JSON.stringify(this.studentData.feesData));
            temp.dob = this.studentData.dob;
            temp.schoolDetail = this.studentData.schoolDetail;
            temp.guardianInfo = this.studentData.guardianInfo;
            this.studentData = temp;
            this.alert.success(res.message, 'Success!');
          }
        });
    }
  }

  deleteFeeRow(feeInd, row) {
    if (row.toDelete) {
      this.studentData.feesData.splice(feeInd, 1);
    } else {
      row.toDelete = true;
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
          }
        });
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
          console.log('getFees', res);
          if (res.success) {
            this.studentData.feesData = res.data.map(val => {
              delete val._id;
              return val;
            });
            console.log('this.studentData.feesData', this.studentData.feesData);
          }
        })
    }
  }


  submitStudent() {
    if (this.studentData.isTransport) {
      this.transportFees = {
        particular: 'Transport',
        amount: parseFloat(this.studentData.transportData.amount),
        type: 'transport',
        dueDate: '7',
        months: []
      };
      const sel = this.sessionData.find(val => val._id.toString() === this.studentData.schoolDetail.sessionId);
      this.getAllMonths(sel.startDate.year
        + '-' + sel.startDate.month + '-' + sel.startDate.day, this.studentData.transportData.doj.month - sel.startDate.month);
      this.studentData.feesData.push({
        sessionId: this.studentData.schoolDetail.sessionId,
        schoolId: this.studentData.schoolDetail.schoolId,
        classId: this.studentData.schoolDetail.classId,
        createdById: this.userData._id,
        feeData: this.transportFees
      });
    }
    this.isDisable = true;
    console.log('this.schoolData', this.studentData);
    this.studentData.schoolDetail.schoolId = this.schoolData._id.toString();
    this.studentData.schoolDetail.sessionId = this.schoolData.currentSession || '';
    if (this.studentData.isTransport === false) {
      if (
        !this.studentData.name ||
        !this.studentData.guardianInfo.name ||
        !this.studentData.guardianInfo.relation ||
        !this.studentData.guardianInfo.contactNo ||
        !this.studentData.schoolDetail.classId ||
        !this.studentData.schoolDetail.sessionId ||
        !this.studentData.schoolDetail.admissionType
      ) {
        this.alert.error('Required fields are empty!', 'Fatal Error!');
        this.isDisable = false;
        return;
      } else {
        this.studentData.isTransport = false;
        this.student.addStudent(this.studentData)
          .map(x => x.json())
          .subscribe(res => {
            console.log('res', res);
            this.alert.success(res.message, 'Success');
            this.router.navigate(['/school/admin/student/view']);
          }, err => {
            err = err.json();
            console.log('err', err);
            this.isDisable = false;
            this.alert.error(err.error, 'Error');
          })
      }
    } else {
      if (
        !this.studentData.name ||
        !this.studentData.guardianInfo.name ||
        !this.studentData.guardianInfo.relation ||
        !this.studentData.guardianInfo.contactNo ||
        !this.studentData.schoolDetail.classId ||
        !this.studentData.schoolDetail.sessionId ||
        !this.studentData.schoolDetail.admissionType ||
        !this.studentData.transportData.doj ||
        !this.studentData.transportData.amount
      ) {
        this.alert.error('Required fields are empty!', 'Fatal Error!');
        this.isDisable = false;
        return;
      } else {
        this.studentData.isTransport = true;
        this.student.addStudent(this.studentData)
          .map(x => x.json())
          .subscribe(res => {
            console.log('res', res);
            this.alert.success(res.message, 'Success');
            this.router.navigate(['/school/admin/student/view']);
          }, err => {
            err = err.json();
            console.log('err', err);
            this.isDisable = false;
            this.alert.error(err.error, 'Error');
          })
      }
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

  getAllMonths(start, diff) {
    let allMonths = [];
    const dateStart = moment(start, 'YYYY-MM-DD');
    for (let i = 0; i < 12; i++) {
      allMonths.push(dateStart.format('MMMM').toLowerCase());
      dateStart.add(1, 'month');
    }
    if (this.settingData &&
      this.settingData.feesSettings &&
      this.settingData.feesSettings.transportSettings &&
      this.settingData.feesSettings.transportSettings.months &&
      this.settingData.feesSettings.transportSettings.months.length) {
      allMonths = this.settingData.feesSettings.transportSettings.months;
    }
    this.transportFees.months = allMonths.map((x, ind) => {
      const tmp = {
        name: x,
        selected: true
      };
      if (ind < diff) {
        tmp.selected = false;
      }
      return tmp;
    });
    // this.feeRow.feeData.months = allMonths.map(x => {
    //   return {
    //     name: x,
    //     selected: false
    //   };
    // });
  }
}

