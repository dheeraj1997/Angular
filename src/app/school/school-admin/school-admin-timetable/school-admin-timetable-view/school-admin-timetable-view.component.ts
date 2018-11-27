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
  selector: 'app-school-admin-timetable-view',
  templateUrl: './school-admin-timetable-view.component.html',
  styleUrls: ['./school-admin-timetable-view.component.scss']
})
export class SchoolAdminTimetableViewComponent implements OnInit {
  schoolData = {
    _id: ''
  };
  userData = {
    _id: ''
  };
  showBelow = false;
  showPrint = true;
  teacherId = '';
  days = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];
  classData = [];
  selectedClass = '';
  selectedSession = '';
  sessionData = [];
  subjectData = [];
  teacherData = [];
  teacherIdNameMap = {};
  subjectIdNameMap = {};
  classIdNameMap = {};
  timetableData = {
    _id: '',
    periodId: '',
    schoolId: '',
    sessionId: '',
    classId: '',
    createdById: '',
    periods: []
  };
  isDisable = false;
  withTeacher = false;

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

    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
        if (res && res.data && res.data._id) {
          this.schoolData = res.data;
          this.timetableData.schoolId = this.schoolData._id.toString();
          this.selectedSession = ls.getItem('selectedSession') || '';
          this.selectedClass = ls.getItem('selectedClass') || '';
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
              }
            });
          this.session.getSessionBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res4 => {
              console.log('res4', res4);
              if (res4.data && res4.data.length) {
                this.sessionData = res4.data;
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

  // getPeriods() {
  //   if (this.schoolData._id && this.selectedSession && this.selectedClass) {
  //     this.school.getPeriods(this.schoolData._id, this.selectedSession, this.selectedClass)
  //       .map(x => x.json())
  //       .subscribe(res => {
  //         console.log('periods', res);
  //         if (res.data && res.data.periods && res.data.periods.length) {
  //           // console.log('timetableData', res.data);
  //           // this.timetableData = res.data;
  //           this.timetableData.periodId = res.data._id;
  //           this.timetableData.periods = res.data.periods.map(val => {
  //             console.log('val', val);
  //             val.days = this.days.map(day => {
  //               return {'day': day, 'selected': false};
  //             });
  //             return val;
  //           });
  //           this.getTimeTable();
  //         } else {
  //           this.alert.warning('Not able to fetch period information!');
  //           // this.showBelow = false;
  //           // this.router.navigate(['/school/admin/master/period/add']);
  //         }
  //       });
  //   }
  // }

  getTimeTable() {
    this.showBelow = false;
    if (this.schoolData._id && this.selectedSession && this.selectedClass) {
      this.timeTable.getBySchoolAndClassId(this.schoolData._id, this.selectedClass, this.selectedSession)
        .map(x => x.json())
        .subscribe(res => {
          console.log('getBySchoolAndClassId res', res);
          if (res.success) {
            if (res.data && res.data._id) {
              this.timetableData._id = res.data._id;
              if (res.data.periods && res.data.periods.length) {
                this.showBelow = true;
                this.timetableData.periods = res.data.periods;
              }
            } else {
              this.timetableData._id = '';
            }
          }
        })
    }
  }

  toggleTeacher() {
    this.withTeacher = !this.withTeacher;
    console.log('this.withTeacher', this.withTeacher);
  }

  printPdf() {
    this.isDisable = true;
    const pdfData = this.timetableData.periods.reduce((a, p) => {
      const temp = {period: p.number};
      p.days.forEach(val => {
        temp[val.day.toLowerCase()] = {subject: this.subjectIdNameMap[val.subjectId] || '-'};
        if (this.withTeacher) {
          temp[val.day.toLowerCase()].teacher = this.teacherIdNameMap[val.teacherId || '-'];
        }
      });
      a.push(temp);
      return a;
    }, []).sort((a, b) => {
      return a.period - b.period;
    });
    const clsHere = this.classData.find(val => val._id.toString() === this.selectedClass);
    const sessionHere = this.sessionData.find(val => val._id.toString() === this.selectedSession);
    const pdfName = clsHere.name + '_' + sessionHere.startDate.year + '-'
      + sessionHere.endDate.year + '_timetable_' + (this.withTeacher ? 'teacher_' : '');
    console.log('pdfData', pdfData);
    console.log('pdfName', pdfName);
    this.timeTable.getTimetablePdf({data: {periods: pdfData}, fileName: pdfName})
      .map(x => x.json())
      .subscribe(res => {
        this.isDisable = false;
        if (res.success) {
          window.open('https://inforida.in/timetable/' + res.filename);
        } else {
          this.alert.error('Error in downloading CSV');
        }
      });
  }
}
