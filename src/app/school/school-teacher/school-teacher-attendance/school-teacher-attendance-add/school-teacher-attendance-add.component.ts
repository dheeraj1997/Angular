import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TeacherService} from '../../../../shared/services/teacher.service';
import {SchoolService} from '../../../../shared/services/school.service';
import {TimeTableService} from '../../../../shared/services/timeTable.service';
import {GSettingsService} from '../../../../shared/services/g-settings.service';
import * as moment from 'moment';

const ls = localStorage;
const ss = sessionStorage;

@Component({
  selector: 'app-school-teacher-attendance-add',
  templateUrl: './school-teacher-attendance-add.component.html',
  styleUrls: ['./school-teacher-attendance-add.component.scss']
})
export class SchoolTeacherAttendanceAddComponent implements OnInit {
  userData = {
    _id: ''
  };
  schoolData = {
    _id: '',
    currentSession: ''
  };
  attendanceList = [];
  teacherData: any;
  timeTableData = [];
  attendanceType = 'timetable';

  constructor(private teacher: TeacherService,
              private alert: ToastrService,
              private router: Router,
              private settings: GSettingsService,
              private timeTable: TimeTableService,
              private school: SchoolService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    console.log('this.user', this.userData);
    this.teacher.getTeacherByLoginId(this.userData._id)
      .map(x => x.json())
      .subscribe(res => {
        console.log('teacher res', res);
        if (res.data) {
          this.teacherData = res.data;
          this.getSchoolData();
        } else {
          this.alert.error('No teacher found from this login id!', 'Error');
        }
      })
  }

  getTimeTable(day) {
    this.timeTable.getDayTimeTableByTeacherId(this.teacherData._id, this.schoolData.currentSession, day)
      .map(x => x.json())
      .subscribe(res => {
        console.log('timetable res', res);
        if (res.data) {
          this.timeTableData = res.data;
        } else {
          this.alert.error('No timetable found!', 'Error');
        }
      });
  }

  getSchoolData() {
    console.log('this.teacherData', this.teacherData);
    this.school.getSchoolById(this.teacherData.schoolId)
      .map(x => x.json())
      .subscribe(res => {
        console.log('school res', res);
        if (res.data) {
          this.schoolData = res.data;
          if (!this.schoolData.currentSession) {
            this.alert.info('Current session not selected. Please contact your admin!');
            this.router.navigate(['/school/teacher/dashboard']);
          } else {
            this.settings.getSettings(this.schoolData._id)
              .map(x => x.json())
              .subscribe(setRes => {
                console.log('setRes', setRes);
                if (setRes.success &&
                  setRes.data &&
                  setRes.data.attendanceType &&
                  setRes.data.attendanceType === 'daily') {
                  this.attendanceType = setRes.data.attendanceType;
                  console.log('this.attendanceType', this.attendanceType);
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
                          this.alert.info('No attendance set for today. Please contact your admin to change attendance settings.');
                          this.router.navigate(['/school/teacher/dashboard']);
                        } else if (cslAttRes.type === 'no settings') {
                          this.alert.info('Please change settings to continue.');
                          this.router.navigate(['/school/admin/settings/global']);
                        } else {
                          this.alert.info(cslAttRes.message);
                        }
                      }
                    })
                } else {
                  console.log('inside else');
                  const today = moment().format('dddd');
                  console.log('today', today);
                  this.getTimeTable(today);
                }
              })
          }
        } else {
          this.alert.error('No school found from this school id!', 'Error');
        }
      });
  }

  takeAttendanceTimeTable(teacherTimeTableData) {
    console.log('teacherTimeTableData', teacherTimeTableData);
    if (!teacherTimeTableData.toTake) {
      this.alert.error('Attendance already taken!', 'Error');
      return;
    }
    ss.setItem('teacherTimeTableData', JSON.stringify(teacherTimeTableData));
    if (ss.getItem('teacherTimeTableData')) {
      this.router.navigate(['/school/teacher/attendance/take', teacherTimeTableData._id]);
    }
  }

  viewAttendanceTimeTable(teacherTimeTableData) {
    console.log('teacherTimeTableData', teacherTimeTableData);
    ss.setItem('teacherTimeTableData', JSON.stringify(teacherTimeTableData));
    if (ss.getItem('teacherTimeTableData')) {
      this.router.navigate(['/school/teacher/attendance/view', teacherTimeTableData._id]);
    }
  }

  takeAttendanceDaily(list) {
    console.log('list', list);
    ls.setItem('listData', JSON.stringify(list));
    this.router.navigate(['/school/teacher/attendance/take', list._id]);
  }

  viewAttendanceDaily(list) {
    console.log('list', list);
    ls.setItem('listData', JSON.stringify(list));
    this.router.navigate(['/school/teacher/attendance/view', list._id]);
  }

}
