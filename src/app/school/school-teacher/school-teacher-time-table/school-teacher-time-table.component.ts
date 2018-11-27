import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TeacherService} from '../../../shared/services/teacher.service';
import {SchoolService} from '../../../shared/services/school.service';
import {TimeTableService} from '../../../shared/services/timeTable.service';
import * as moment from 'moment';

const ls = localStorage;
const ss = sessionStorage;

@Component({
  selector: 'app-school-teacher-time-table',
  templateUrl: './school-teacher-time-table.component.html',
  styleUrls: ['./school-teacher-time-table.component.scss']
})
export class SchoolTeacherTimeTableComponent implements OnInit {

  user: any;
  teacherData: any;
  schoolData: any;
  timeTableData = [];

  constructor(private teacher: TeacherService,
              private alert: ToastrService,
              private router: Router,
              private timeTable: TimeTableService,
              private school: SchoolService) {
  }

  ngOnInit() {
    this.user = JSON.parse(ls.getItem('userData'));
    console.log('this.user', this.user);
    this.teacher.getTeacherByLoginId(this.user._id)
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
          const today = moment().format('dddd');
          console.log('today', today);
          this.getTimeTable(today);
        } else {
          this.alert.error('No school found from this school id!', 'Error');
        }
      });
  }

}
