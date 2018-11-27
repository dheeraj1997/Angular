import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../shared/services/school.service';
import {StaffService} from '../../../shared/services/staff.service';
import {ClassService} from '../../../shared/services/class.service';
import {SessionService} from '../../../shared/services/session.service';
import * as moment from 'moment';

const ls = localStorage;

@Component({
  selector: 'app-school-accountant-ledger',
  templateUrl: './school-accountant-ledger.component.html',
  styleUrls: ['./school-accountant-ledger.component.scss']
})
export class SchoolAccountantLedgerComponent implements OnInit {
  userData = {
    _id: ''
  };
  schoolData = {
    _id: ''
  };
  classData = [];
  sessionData = [];
  selectedClass = '';
  selectedSession = '';
  studentData = [];
  toShowData = [];
  allMonths = [];
  searchString: string;
  initialData: string;

  constructor(private school: SchoolService,
              private staff: StaffService,
              private cls: ClassService,
              private session: SessionService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.selectedClass = ls.getItem('selectedClass');
    this.selectedSession = ls.getItem('selectedSession');
    if (this.userData._id) {
      this.staff.getStaffByLoginId(this.userData._id)
        .map(x => x.json())
        .subscribe(staffRes => {
          console.log('staffRes', staffRes);
          if (staffRes.success && staffRes.data) {
            this.school.getSchoolById(staffRes.data.schoolId)
              .map(x => x.json())
              .subscribe(schoolRes => {
                console.log('schoolRes', schoolRes);
                if (schoolRes.success && schoolRes.data) {
                  this.schoolData = schoolRes.data;
                } else {
                  this.alert.error('No School data!', 'Error!');
                }
              });
            this.cls.getClassBySchoolId(staffRes.data.schoolId)
              .map(x => x.json())
              .subscribe(clsRes => {
                console.log('clsRes', clsRes);
                if (clsRes.success && clsRes.data && clsRes.data.length) {
                  this.classData = clsRes.data;
                } else {
                  this.alert.error('No Class data!', 'Error!');
                }
              });
            this.session.getSessionBySchoolId(staffRes.data.schoolId)
              .map(x => x.json())
              .subscribe(res => {
                console.log('getSessionBySchoolId res', res);
                if (res.success && res.data && res.data.length) {
                  this.sessionData = res.data;
                } else {
                  this.alert.error('No Class data!', 'Error!');
                }
              });
          } else {
            this.alert.error('No Staff data!', 'Error!');
          }
        })
    } else {
      this.alert.error('No user data!', 'Error!');
    }
  }

  generateLedger() {
    console.log('this.schoolData._id', this.schoolData._id);
    console.log('this.selectedClass', this.selectedClass);
    console.log('this.selectedSession', this.selectedSession);
    const reqSession = this.sessionData.find(val => val._id.toString() === this.selectedSession.toString());
    const s = moment(reqSession.startDate.day + '-' + reqSession.startDate.month + '-' + reqSession.startDate.year, 'DD-MM-YYYY');
    this.allMonths = [s.format('MMMM-YY')];
    for (let i = 1; i < 12; i++) {
      this.allMonths.push(s.add(1, 'month').format('MMMM-YY'));
    }
    if (this.schoolData._id && this.selectedClass && this.selectedSession) {
      this.school.getFeesLedger(this.schoolData._id, this.selectedSession, this.selectedClass)
        .map(x => x.json())
        .subscribe(res => {
          console.log('getStudentBySchoolAndClassAndSession res', res);
          if (res.success && res.data && res.data.length) {
            this.alert.success(res.message);
            this.studentData = res.data;
            this.toShowData = res.data;
            this.initialData = JSON.stringify(res.data);
          } else {
            this.alert.warning('No student fetched!');
          }
        })
    }
  }

  onClassChange() {
    ls.setItem('selectedClass', this.selectedClass);
  }

  onSessionChange() {
    ls.setItem('selectedSession', this.selectedSession);
  }

  generateCsv() {
    const csvData = JSON.parse(this.initialData).reduce((a, p) => {
      const temp = {
        RollNo: p.rollNo,
        Name: p.name
      };
      this.allMonths.forEach(val => {
        temp[val] = p.feeData[val];
      });
      temp['Submitted'] = p.feeData.totalCollected;
      temp['Remaining'] = p.feeData.total - p.feeData.totalCollected;
      temp['Total'] = p.feeData.total;
      a.push(temp);
      return a;
    }, []);
    console.log('csvData', csvData);
    const clsHere = this.classData.find(val => val._id.toString() === this.selectedClass);
    const csvName = clsHere.name + '_ledger_' + moment().format('DD-MMMM-YYYY');
    this.school.getFeesLedgerCsv({data: csvData, fileName: csvName})
      .map(x => x.json())
      .subscribe(res => {
        if (res.success) {
          window.open('https://inforida.in/feesledger/' + res.file);
        } else {
          this.alert.error('Error in downloading CSV');
        }
      })
  }

  search(e) {
    console.log('e', e);
    if (e) {
      const pattern = new RegExp(e, 'i');
      this.toShowData = this.toShowData.filter(val => {
        return pattern.test(val.name);
      });
      if (!this.toShowData.length) {
        this.toShowData = JSON.parse(this.initialData);
      }
    } else {
      this.toShowData = JSON.parse(this.initialData);
    }
  }
}


