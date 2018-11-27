import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {GSettingsService} from '../../../../shared/services/g-settings.service';
import * as moment from 'moment';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-attendance-view',
  templateUrl: './school-admin-attendance-view.component.html',
  styleUrls: ['./school-admin-attendance-view.component.scss']
})
export class SchoolAdminAttendanceViewComponent implements OnInit {
  searchString: string;
  userData = {
    _id: ''
  };
  schoolData = {
    _id: '',
    currentSession: '',
    name: ''
  };
  attendanceData = [];
  initialAttendanceData = '{}';
  listData = {
    date: '',
    className: '',
    takenByName: '',
    totalStudents: 0
  };

  constructor(private alert: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private settings: GSettingsService,
              private school: SchoolService) {
  }

  ngOnInit() {
    this.listData = JSON.parse(ls.getItem('listData'));
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
            this.route.params.subscribe(params => {
              const listId = params.listId;
              this.school.getAttendanceListToView(listId)
                .map(x => x.json())
                .subscribe(atRes => {
                  console.log('atRes', atRes);
                  if (atRes.success) {
                    this.attendanceData = atRes.data;
                    this.initialAttendanceData = JSON.stringify(atRes.data);
                  } else {
                    this.alert.info('No attendance is present in this id.');
                    this.router.navigate(['/school/admin/attendance/list']);
                  }
                })
            })
          }
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  searchStudent(e) {
    console.log('e', e);
    if (e) {
      const pattern = new RegExp(e, 'i');
      this.attendanceData = this.attendanceData.filter(val => {
        return pattern.test(val.name);
      })
    } else {
      this.attendanceData = JSON.parse(this.initialAttendanceData);
    }
  }

}
