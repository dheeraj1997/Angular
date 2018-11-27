import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {SessionService} from '../../../../shared/services/session.service';
import {TeacherService} from '../../../../shared/services/teacher.service';
import {SubjectService} from '../../../../shared/services/subject.service';
import {ClassService} from '../../../../shared/services/class.service';
import {TimeTableService} from '../../../../shared/services/timeTable.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-timetable-create',
  templateUrl: './school-admin-timetable-create.component.html',
  styleUrls: ['./school-admin-timetable-create.component.scss']
})
export class SchoolAdminTimetableCreateComponent implements OnInit {
  schoolData = {
    _id: ''
  };
  userData = {
    _id: ''
  };
  teacherId = '';
  days = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];
  classData = [];
  selectedClass = '';
  selectedSession = '';
  selectedTeacher = '';
  selectedSubject = '';
  sessionData = [];
  subjectData = [];
  teacherData = [];
  teacherIdNameMap = {};
  subjectIdNameMap = {};
  classIdNameMap = {};
  timetableData = {
    _id: '',
    schoolId: '',
    sessionId: '',
    classId: '',
    createdById: '',
    periods: []
  };
  isDisable = false;
  totalPeriod = 0;

  constructor(private router: Router,
              private school: SchoolService,
              private teacher: TeacherService,
              private subject: SubjectService,
              private cls: ClassService,
              private session: SessionService,
              private timeTable: TimeTableService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    if (!this.userData) {
      return;
    }
    this.timetableData.createdById = this.userData._id.toString();
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.timetableData.schoolId = this.schoolData._id.toString();
          this.selectedSession = ls.getItem('selectedSession') || '';
          this.selectedClass = ls.getItem('selectedClass') || '';
          this.selectedSubject = ls.getItem('selectedSubject') || '';
          this.timetableData.schoolId = this.schoolData._id;
          this.timetableData.sessionId = this.selectedSession;
          this.timetableData.classId = this.selectedClass;
          this.getTimeTable();
          this.cls.getClassBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res2 => {
              console.log('res2', res2);
              if (res2.data && res2.data.length) {
                this.classData = res2.data;
                this.classIdNameMap = res2.data.reduce((a, p) => {
                  a[p._id] = p.name;
                  return a;
                }, {});
              } else {
                this.alert.error('Not able to fetch class information!');
              }
            });
          this.subject.getSubjectBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res3 => {
              console.log('res3', res3);
              if (res3.data && res3.data.length) {
                this.subjectData = res3.data;
                this.subjectIdNameMap = res3.data.reduce((a, p) => {
                  a[p._id] = p.name;
                  return a;
                }, {});
              } else {
                this.alert.error('Not able to fetch subject information!');
              }
            });
          this.teacher.getTeacherBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res4 => {
              console.log('res4', res4);
              if (res4.data && res4.data.length) {
                this.teacherData = res4.data;
                this.teacherIdNameMap = res4.data.reduce((a, p) => {
                  a[p._id] = p.name;
                  return a;
                }, {});
              } else {
                this.alert.error('Not able to fetch subject information!');
              }
            });
          this.session.getSessionBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res4 => {
              console.log('res4', res4);
              if (res4.data && res4.data.length) {
                this.sessionData = res4.data;
              } else {
                this.alert.error('Not able to fetch session information!');
              }
            });
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  onSessionSelect() {
    ls.setItem('selectedSession', this.selectedSession);
    this.timetableData.sessionId = this.selectedSession;
    this.getTimeTable();
  }

  onClassSelect() {
    ls.setItem('selectedClass', this.selectedClass);
    this.timetableData.classId = this.selectedClass;
    this.getTimeTable();
  }

  onSubjectSelect() {
    ls.setItem('selectedSubject', this.selectedSubject);
  }

  onPeriodSelect() {
    if (this.totalPeriod || this.totalPeriod === 0) {
      const currentPeriods = this.timetableData.periods.length;
      if (this.totalPeriod >= currentPeriods) {
        for (let i = currentPeriods + 1; i <= this.totalPeriod; i++) {
          const temp: any = {};
          temp.number = i;
          temp.days = this.days.map(day => {
            return {'day': day, 'selected': false};
          });
          this.timetableData.periods.push(temp);
        }
      } else {
        const isConfirm = confirm('Are you sure you want to remove ' + (currentPeriods - this.totalPeriod) + ' periods?');
        if (isConfirm) {
          for (let i = this.totalPeriod + 1; i <= currentPeriods; i++) {
            this.timetableData.periods.pop();
          }
        }
      }
    }
  }

  onTeacherSelect() {
    ls.setItem('selectedTeacher', this.selectedTeacher);
    // this.getPeriods();
  }

  changePeriod(day) {
    if (!this.selectedSubject) {
      this.alert.warning('Select Subject!', 'Error!');
      return;
    }
    console.log('day', day);
    if (!day.selected) {
      day.subjectId = this.selectedSubject;
      day.teacherId = this.selectedTeacher;
    } else {
      day.subjectId = '';
      day.teacherId = '';
    }
    day.selected = !day.selected;
  }

  getTimeTable() {
    if (this.schoolData._id && this.selectedSession && this.selectedClass) {
      this.timeTable.getBySchoolAndClassId(this.schoolData._id, this.selectedClass, this.selectedSession)
        .map(x => x.json())
        .subscribe(res => {
          console.log('getBySchoolAndClassId res', res);
          if (res.success) {
            if (res.data && res.data._id) {
              this.timetableData._id = res.data._id;
              if (res.data.periods && res.data.periods.length) {
                this.timetableData.periods = res.data.periods;
                this.totalPeriod = res.data.periods.length;
              }
            } else {
              this.timetableData._id = '';
              this.totalPeriod = 0;
              this.onPeriodSelect();
            }
          }
        })
    }
  }

  save() {
    console.log('timetableData', this.timetableData);
    this.timeTable.saveSimpleTimeTable(this.timetableData)
      .map(x => x.json())
      .subscribe(res => {
        console.log('saveTimeTable res', res);
        if (res.success) {
          this.alert.success(res.message, 'Success');
          this.router.navigate(['/school/admin/timetable/view']);
        } else {
          const err = res.error;
          const errMsg = this.teacherIdNameMap[err.teacherId] +
            ' is already taking a class on ' + err.day + ' from ' +
            err.startTime.hour + ':' + err.startTime.minute +
            ' to ' + err.endTime.hour + ':' + err.endTime.minute +
            ' in class ' + this.classIdNameMap[err.classId];
          this.alert.error(errMsg, 'Success');

        }
      }, err => {
        this.isDisable = false;
        err = err.json();
        this.alert.error(err.error, 'Error!!');
      })
  }
}
