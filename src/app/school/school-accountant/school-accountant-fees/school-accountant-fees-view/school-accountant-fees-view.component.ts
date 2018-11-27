import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {SessionService} from '../../../../shared/services/session.service';
import {SchoolService} from '../../../../shared/services/school.service';
import {StaffService} from '../../../../shared/services/staff.service';
import {StudentService} from '../../../../shared/services/student.service';
import {ClassService} from '../../../../shared/services/class.service';

const ls = localStorage;

@Component({
  selector: 'app-school-accountant-fees-view',
  templateUrl: './school-accountant-fees-view.component.html',
  styleUrls: ['./school-accountant-fees-view.component.scss']
})
export class SchoolAccountantFeesViewComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  schoolData: any;
  classData = [];
  sessionData = [];
  toShowData = [];
  searchString: string;
  initialData: string;
  selectedClass = '';
  selectedSession = '';

  constructor(private session: SessionService,
              private school: SchoolService,
              private staff: StaffService,
              private cls: ClassService,
              private alert: ToastrService,
              private student: StudentService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.selectedSession = ls.getItem('selectedSession');
    this.selectedClass = ls.getItem('selectedClass');
    if (this.userData._id) {
      this.staff.getStaffByLoginId(this.userData._id)
        .map(x => x.json())
        .subscribe(staffRes => {
          console.log('staffRes', staffRes);
          if (staffRes.success && staffRes.data) {
            this.cls.getClassBySchoolId(staffRes.data.schoolId)
              .map(x => x.json())
              .subscribe(clsRes => {
                console.log('clsRes', clsRes);
                if (clsRes.success && clsRes.data && clsRes.data.length) {
                  this.classData = clsRes.data;
                }
              });

            this.session.getSessionBySchoolId(staffRes.data.schoolId)
              .map(x => x.json())
              .subscribe(sessRes => {
                console.log('sessRes', sessRes);
                if (sessRes.success && sessRes.data && sessRes.data.length) {
                  this.sessionData = sessRes.data;
                }
              });

            this.school.getSchoolById(staffRes.data.schoolId)
              .map(x => x.json())
              .subscribe(schoolRes => {
                console.log('schoolRes', schoolRes);
                if (schoolRes.success && schoolRes.data) {
                  this.schoolData = schoolRes.data;
                  this.getFeeReciept();
                }
              });
          }
        })
    }
  }

  getFeeReciept() {
    if (this.schoolData._id && this.selectedClass && this.selectedSession) {
      this.school.getFeesHistory(this.schoolData._id, this.selectedClass, this.selectedSession)
        .map(x => x.json())
        .subscribe(res => {
          console.log('getFeesBySchoolClassSession res', res);
          if (res.success && res.data && res.data.length) {
            // this.alert.success(res.message, 'success!');
            this.toShowData = res.data;
            this.initialData = JSON.stringify(res.data);
          } else {
            // this.alert.error('No fees fetched!', 'Error!');
          }
        })
    }
  }

  search(e) {
    console.log('e', e);
    if (e) {
      const pattern = new RegExp(e, 'i');
      this.toShowData = this.toShowData.filter(val => {
        return pattern.test(val.studentName);
      });
      if (!this.toShowData.length) {
        this.toShowData = JSON.parse(this.initialData);
      }
    } else {
      this.toShowData = JSON.parse(this.initialData);
    }
  }

  onSessionChange() {
    ls.setItem('selectedSession', this.selectedSession);
    this.getFeeReciept()
  }

  onClassChange() {
    ls.setItem('selectedClass', this.selectedClass);
    this.getFeeReciept()
  }

  getRecipt(filename) {
    // window.open('https://inforida.in/feereceipt/' + filename);
    window.open('https://inforida.in/feereceipt/' + filename);
  }
}



