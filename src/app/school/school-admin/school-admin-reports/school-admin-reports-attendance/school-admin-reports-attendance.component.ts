import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';
import {ClassService} from '../../../../shared/services/class.service';


import * as moment from 'moment';

const ls = localStorage;
const today = new Date();

@Component({
  selector: 'app-school-admin-reports-attendance',
  templateUrl: './school-admin-reports-attendance.component.html',
  styleUrls: ['./school-admin-reports-attendance.component.scss']
})
export class SchoolAdminReportsAttendanceComponent implements OnInit {
  userData = {
    _id: ''
  };
  schoolData = {
    _id: '',
    currentSession: ''
  };
  betweenDates = [];
  classData = [];
  selectedClass = '';
  selectedType = '';
  selectedMonth = '';
  customData = {
    startDate: {year: today.getFullYear(), month: today.getMonth(), day: today.getDate()},
    endDate: {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()}
  };
  monthArr = [];
  selectedSession = '';
  toShowData = [];
  searchString: string;
  initialData: string;

  constructor(private school: SchoolService,
              private config: NgbDatepickerConfig,
              private cls: ClassService,
              private router: Router,
              private alert: ToastrService) {
    config.maxDate = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.selectedClass = ls.getItem('selectedClass');
    this.selectedType = ls.getItem('selectedType');
    const todayDate = moment();
    this.monthArr.push(todayDate.format('MMMM'));
    for (let i = 1; i < 12; i++) {
      this.monthArr.push(todayDate.add(-1, 'month').format('MMMM'));
    }
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        if (res && res.data && res.data._id) {
          console.log('schoolres', res);
          this.schoolData = res.data;
          this.selectedSession = this.schoolData.currentSession;
          if (!this.selectedSession) {
            this.alert.info('No Current Session is selected. Please Update Current Session to Continue!');
            this.router.navigate(['/school/admin/master/session/view']);
          }
          if (res.data._id) {
            this.cls.getClassBySchoolId(res.data._id)
              .map(x => x.json())
              .subscribe(res2 => {
                this.classData = res2.data;
              })
          } else {
            this.alert.error('School Data not found ' + ' Reload ! ', 'Error')
          }
        } else {
          this.alert.error('School not found ' + ' Reload ! ', 'Error')
        }
      })
  }

  getAttendance() {
    console.log('this.betweenDates', this.betweenDates);
    if (this.schoolData._id && this.selectedClass && this.selectedSession) {
      this.school.getTodayClassAttendanceReport(this.schoolData._id, this.selectedSession,
        this.selectedClass, {
          dates: this.betweenDates
        })
        .map(x => x.json())
        .subscribe(res => {
          console.log('getTodayClassAttendanceReport res', res);
          if (res.success && res.data && res.data.length) {
            this.toShowData = res.data;
            this.initialData = JSON.stringify(res.data);
          } else {
            this.toShowData = [];
            this.initialData = '[]';
            this.alert.warning(res.message, 'Warning!');
          }
        })
    }
  }

  onClassChange() {
    this.toShowData = [];
    this.initialData = '[]';
    ls.setItem('selectedClass', this.selectedClass);
  }

  onTypeChange() {
    this.toShowData = [];
    this.initialData = '[]';
    ls.setItem('selectedType', this.selectedType);
  }

  generateAttendance() {
    ls.setItem('selectedClass', this.selectedClass);
    ls.setItem('selectedType', this.selectedType);
    switch (this.selectedType) {
      case 'daily':
        this.betweenDates = [moment().format('DD-MM-YYYY')];
        this.getAttendance();
        break;
      case 'weekly':
        this.betweenDates = [];
        let startDate = moment().add(-6, 'days');
        this.betweenDates.push(startDate.format('DD-MM-YYYY'));
        for (let i = 1; i < 7; i++) {
          const tempDate = startDate.add(1, 'days').format('DD-MM-YYYY');
          this.betweenDates.push(tempDate);
        }
        this.getAttendance();
        break;
      case 'monthly':
        this.betweenDates = [];
        startDate = moment(this.selectedMonth, 'MMMM');
        this.betweenDates.push(startDate.format('DD-MM-YYYY'));
        for (let i = 1; i < startDate.daysInMonth(); i++) {
          const tempDate = startDate.add(1, 'days').format('DD-MM-YYYY');
          this.betweenDates.push(tempDate);
        }
        this.getAttendance();
        break;
      case 'custom':
        this.betweenDates = [];
        const s = this.customData.startDate;
        const e = this.customData.endDate;
        startDate = moment(s.year + '/' + s.month + '/' + s.day, 'YYYY/MM/DD');
        const endDate = moment(e.year + '/' + e.month + '/' + e.day, 'YYYY/MM/DD');
        this.betweenDates.push(startDate.format('DD-MM-YYYY'));
        const diff = endDate.diff(startDate, 'days');
        for (let i = 1; i < diff; i++) {
          const tempDate = startDate.add(1, 'days').format('DD-MM-YYYY');
          this.betweenDates.push(tempDate);
        }
        this.getAttendance();
        break;
    }
  }

  generateCsv() {
    const csvData = JSON.parse(this.initialData).reduce((a, p, ind) => {
      const temp: any = {};
      temp['#'] = ind + 1;
      temp['RollNo'] = p.rollNo;
      temp['Name'] = p.name;
      this.betweenDates.forEach((val) => {
        if (this.betweenDates.length > 365) {
          temp[' ' + val] = p.attendance[val];
        } else if (this.betweenDates.length > 31) {
          temp[' ' + val.substring(0, 5)] = p.attendance[val];
        } else {
          temp[' ' + val.substring(0, 2)] = p.attendance[val];
        }
      });
      a.push(temp);
      return a;
    }, []);
    console.log('csvData', csvData);
    const clsHere = this.classData.find(val => val._id.toString() === this.selectedClass);
    const csvName = clsHere.name + '_' + this.selectedType + '_' + moment().format('DD-MMMM-YYYY') + '_attendance_report';
    this.school.getAttendanceReportCsv({data: csvData, fileName: csvName})
      .map(x => x.json())
      .subscribe(res => {
        if (res.success) {
          window.open('https://inforida.in/attendancereport/' + res.file);
        } else {
          this.alert.error('Error in downloading CSV');
        }
      });
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

