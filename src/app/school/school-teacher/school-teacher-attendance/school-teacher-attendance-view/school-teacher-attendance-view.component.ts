import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {SchoolService} from '../../../../shared/services/school.service';
import {ClassService} from '../../../../shared/services/class.service';
import {SubjectService} from '../../../../shared/services/subject.service';
import {StudentService} from '../../../../shared/services/student.service';
import {AttendanceService} from '../../../../shared/services/attendance.service';
import {TeacherService} from '../../../../shared/services/teacher.service';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {GSettingsService} from '../../../../shared/services/g-settings.service';
import * as moment from 'moment';
import * as _ from 'lodash';

const ls = localStorage;
const ss = sessionStorage;

@Component({
  selector: 'app-school-teacher-attendance-view',
  templateUrl: './school-teacher-attendance-view.component.html',
  styleUrls: ['./school-teacher-attendance-view.component.scss']
})
export class SchoolTeacherAttendanceViewComponent implements OnInit {
  schoolData = {
    _id: '',
    currentSession: ''
  };
  teacherData = {
    _id: '',
    schoolId: '',
  };
  userData = {
    _id: ''
  };
  classData = [];
  subjectData = [];
  selectedClass: string;
  selectedSubject: string;
  selectedTeacherTimetableId: string;
  searchString: string;
  selectedDate: any;
  teacherTimeTableData: any;
  attendanceData = [];
  initialAttendanceData: string;
  attendanceType = 'timetable';
  listData = {
    date: '',
    className: '',
    takenByName: '',
    totalStudents: 0
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private school: SchoolService,
              private student: StudentService,
              private subject: SubjectService,
              private attendance: AttendanceService,
              private teacher: TeacherService,
              private settings: GSettingsService,
              private cls: ClassService,
              private config: NgbDatepickerConfig,
              private alert: ToastrService) {
    // customize default values of datepickers used by this component tree
    const today = new Date();
    this.selectedDate = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
    config.maxDate = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
    config.minDate = {year: 2017, month: 10, day: 10};
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.teacher.getTeacherByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
          console.log('res', res);
          if (res && res.data && res.data._id) {
            this.teacherData = res.data;
            this.school.getSchoolById(this.teacherData.schoolId)
              .map(x => x.json())
              .subscribe(schoolRes => {
                console.log('school res', schoolRes);
                if (schoolRes.data) {
                  this.schoolData = schoolRes.data;
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
                          this.listData = JSON.parse(ls.getItem('listData'));
                          console.log('this.attendanceType', this.attendanceType);
                          this.route.params.subscribe(params => {
                            const listId = params.teacherAttendanceId;
                            this.school.getAttendanceListToView(listId)
                              .map(x => x.json())
                              .subscribe(atRes => {
                                console.log('atRes', atRes);
                                if (atRes.success) {
                                  this.attendanceData = atRes.data;
                                  this.initialAttendanceData = JSON.stringify(atRes.data);
                                } else {
                                  this.alert.info('No attendance is present in this id.');
                                  this.router.navigate(['/school/teacher/attendance/add']);
                                }
                              })
                          })
                        } else {
                          this.teacherTimeTableData = JSON.parse(ss.getItem('teacherTimeTableData'));
                          console.log('this.teacherTimeTableData', this.teacherTimeTableData);
                          if (this.teacherTimeTableData) {
                            this.selectedClass = this.teacherTimeTableData.classId;
                            this.selectedSubject = this.teacherTimeTableData.subjectId;
                            this.selectedTeacherTimetableId = this.teacherTimeTableData._id;
                            this.getClassAttendance();
                          }
                          this.cls.getClassBySchoolId(this.teacherData.schoolId)
                            .map(x => x.json())
                            .subscribe(res2 => {
                              console.log('res2', res2);
                              if (res2.data && res2.data.length) {
                                this.classData = res2.data;
                              } else {
                                this.alert.error('Not able to fetch class information!');
                              }
                            });
                          this.subject.getSubjectBySchoolId(this.teacherData.schoolId)
                            .map(x => x.json())
                            .subscribe(res3 => {
                              console.log('res3', res3);
                              if (res3.data && res3.data.length) {
                                this.subjectData = res3.data;
                              } else {
                                this.alert.error('Not able to fetch subject information!');
                              }
                            });
                        }
                      })
                  }
                }
              });
          } else {
            this.alert.error('Not able to fetch school information!', 'Reload Page');
          }
        }
      );
    // this.route.queryParams.subscribe(params => {
    //   console.log('query params', params);
    // });
  }

  getClassAttendance() {
    const classId = this.selectedClass;
    const subjectId = this.selectedSubject;
    const teacherTimetableId = this.selectedTeacherTimetableId;
    const date = this.selectedDate;
    if (!classId) {
      return;
    }
    if (!subjectId) {
      return;
    }
    if (!date) {
      return;
    }
    const dateHere = moment(date.year + '-' + date.month + '-' + date.day, 'YYYY-MM-DD')
      .format('DD-MM-YYYY');
    this.attendance.getAttendanceByClassId(classId, subjectId, dateHere, teacherTimetableId)
      .map(x => x.json())
      .subscribe(res => {
        if (res.success) {
          this.attendanceData = res.data;
          this.initialAttendanceData = JSON.stringify(res.data);
          this.alert.success(res.message, 'Success!!');
        } else {
          this.alert.error(res.error, 'Error!!');
          this.attendanceData = [];
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
