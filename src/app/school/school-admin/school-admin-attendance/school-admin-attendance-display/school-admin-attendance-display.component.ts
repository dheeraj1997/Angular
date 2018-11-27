import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';
import {GSettingsService} from '../../../../shared/services/g-settings.service';
import * as moment from 'moment';

const ls = localStorage;
const today = new Date();

@Component({
  selector: 'app-school-admin-attendance-display',
  templateUrl: './school-admin-attendance-display.component.html',
  styleUrls: ['./school-admin-attendance-display.component.scss']
})
export class SchoolAdminAttendanceDisplayComponent implements OnInit {
  userData = {
    _id: ''
  };
  schoolData = {
    _id: '',
    currentSession: ''
  };
  attendanceList = [];
  attendanceDate = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};

  constructor(private alert: ToastrService,
              private router: Router,
              private config: NgbDatepickerConfig,
              private settings: GSettingsService,
              private school: SchoolService) {
    config.maxDate = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          if (!this.schoolData.currentSession) {
            this.alert.info('Current session not selected!');
            this.router.navigate(['/school/admin/master/session/view']);
          } else {
            this.getAttendanceList();
          }
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  getAttendanceList() {
    console.log('attendanceDate', this.attendanceDate);
    const toSendDate = this.attendanceDate.day + '-' + this.attendanceDate.month + '-' + this.attendanceDate.year;
    this.school.getClassAttendanceList(this.schoolData._id, this.schoolData.currentSession, toSendDate)
      .map(x => x.json())
      .subscribe(cslAttRes => {
        if (cslAttRes.success) {
          this.attendanceList = cslAttRes.data.filter(val => {
            return val.totalStudents > 0;
          });
          console.log('this.attendanceList', this.attendanceList);
        } else {
          if (cslAttRes.type === 'no day') {
            this.alert.info('No attendance set for today. Please change attendance setting to continue.');
            this.router.navigate(['/school/admin/settings/global']);
          } else if (cslAttRes.type === 'no settings') {
            this.alert.info('Please change settings to continue.');
            this.router.navigate(['/school/admin/settings/global']);
          } else {
            this.alert.info(cslAttRes.message);
          }
        }
      })
  }

  takeAttendance(list) {
    console.log('list', list);
    ls.setItem('listData', JSON.stringify(list));
    this.router.navigate(['/school/admin/attendance/take', list._id]);
  }

  viewAttendance(list) {
    console.log('list', list);
    ls.setItem('listData', JSON.stringify(list));
    this.router.navigate(['/school/admin/attendance/view', list._id]);
  }

}
