import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {GSettingsService} from '../../../../shared/services/g-settings.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-attendance-list',
  templateUrl: './school-admin-attendance-list.component.html',
  styleUrls: ['./school-admin-attendance-list.component.scss']
})
export class SchoolAdminAttendanceListComponent implements OnInit {
  userData = {
    _id: ''
  };
  schoolData = {
    _id: '',
    currentSession: ''
  };
  attendanceList = [];

  constructor(private alert: ToastrService,
              private router: Router,
              private settings: GSettingsService,
              private school: SchoolService) {
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
            this.school.getTodayClassAttendanceList(this.schoolData._id, this.schoolData.currentSession)
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
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
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
