import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {GSettingsService} from '../../../../shared/services/g-settings.service';
import * as moment from 'moment';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-attendance-take',
  templateUrl: './school-admin-attendance-take.component.html',
  styleUrls: ['./school-admin-attendance-take.component.scss']
})
export class SchoolAdminAttendanceTakeComponent implements OnInit {

  userData = {
    _id: ''
  };
  schoolData = {
    _id: '',
    currentSession: '',
    name: ''
  };
  attendanceData = {
    _id: '',
    className: '',
    classId: '',
    sessionId: '',
    studentList: [],
    date: '',
    toTake: true
  };
  isIcon = true;

  constructor(private alert: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
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
            this.route.params.subscribe(params => {
              const listId = params.listId;
              this.school.getAttendanceListToTake(listId)
                .map(x => x.json())
                .subscribe(atRes => {
                  console.log('atRes', atRes);
                  if (atRes.success) {
                    this.attendanceData = atRes.data;
                    if (!this.attendanceData.toTake) {
                      this.alert.info('Attendance already taken.');
                      this.router.navigate(['/school/admin/attendance/list']);
                    }
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

  togglePresent(data) {
    data.isPresent = !data.isPresent;
  }

  toggleTake() {
    this.isIcon = !this.isIcon;
  }

  submitAttendance(isSms?) {
    const self = this;
    const toSubmitData = this.attendanceData.studentList.map(function (val) {
      const temp = {
        studentId: val._id,
        rollNo: val.schoolDetail.rollNo || val.schoolDetail.admissionNumber,
        name: val.name,
        classAttendanceId: self.attendanceData._id,
        emergencyContactNo: val.emergencyContactNo,
        schoolId: self.schoolData._id,
        schoolName: self.schoolData.name,
        classId: self.attendanceData.classId,
        sessionId: self.attendanceData.sessionId,
        createdById: self.userData._id,
        comment: '',
        date: self.attendanceData.date,
        isSms: !!isSms,
        status: 'present'
      };
      if (!val.isPresent) {
        temp.status = 'absent';
      }
      return temp;
    });
    console.log('toSubmitData', toSubmitData);
    this.school.saveClassAttendanceTaken(toSubmitData)
      .map(x => x.json())
      .subscribe(res => {
        console.log('api res', res);
        let mesSuf = '';
        if (isSms) {
          mesSuf = ' with sms';
        }
        this.alert.success(res.message + mesSuf + '!', 'Success');
        this.router.navigate(['/school/admin/attendance/list']);
      });
  }

}
