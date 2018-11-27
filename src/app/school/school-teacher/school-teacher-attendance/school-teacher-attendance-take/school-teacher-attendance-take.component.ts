import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr'
import {TeacherService} from '../../../../shared/services/teacher.service';
import {SchoolService} from '../../../../shared/services/school.service';
import {TimeTableService} from '../../../../shared/services/timeTable.service';
import {AttendanceService} from '../../../../shared/services/attendance.service';
import {StudentService} from '../../../../shared/services/student.service';
import {GSettingsService} from '../../../../shared/services/g-settings.service';
import * as moment from 'moment';

const ls = localStorage;

@Component({
  selector: 'app-school-teacher-attendance-take',
  templateUrl: './school-teacher-attendance-take.component.html',
  styleUrls: ['./school-teacher-attendance-take.component.scss']
})
export class SchoolTeacherAttendanceTakeComponent implements OnInit {
  teacherData: any;
  teacherAttendanceId: string;
  selectedClass: string;
  teacherTimeTableData: any;
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
  studentData: any;
  isIcon = true;
  attendanceType = 'timetable';

  constructor(private teacher: TeacherService,
              private alert: ToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private student: StudentService,
              private settings: GSettingsService,
              private attendance: AttendanceService,
              private timeTable: TimeTableService,
              private school: SchoolService) {
  }

  ngOnInit() {
    this.teacherTimeTableData = JSON.parse(ls.getItem('teacherTimeTableData')) || {};
    this.userData = JSON.parse(ls.getItem('userData'));
    console.log('this.userData', this.userData);
    this.teacher.getTeacherByLoginId(this.userData._id)
      .map(x => x.json())
      .subscribe(teacherRes => {
        console.log('teacher res', teacherRes);
        if (teacherRes.data) {
          this.teacherData = teacherRes.data;
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
                        console.log('this.attendanceType', this.attendanceType);
                        this.activatedRoute.params.subscribe(params => {
                          const listId = params.teacherAttendanceId;
                          this.school.getAttendanceListToTake(listId)
                            .map(x => x.json())
                            .subscribe(atRes => {
                              console.log('atRes', atRes);
                              if (atRes.success) {
                                this.attendanceData = atRes.data;
                                if (!this.attendanceData.toTake) {
                                  this.alert.info('Attendance already taken.');
                                  this.router.navigate(['/school/teacher/attendance/add']);
                                }
                              } else {
                                this.alert.info('No attendance is present in this id.');
                                this.router.navigate(['/school/teacher/attendance/add']);
                              }
                            })
                        })
                      } else {
                        console.log('inside else');
                        this.activatedRoute.params.subscribe((params) => {
                          this.teacherAttendanceId = params.teacherAttendanceId;
                          this.timeTable.getTeacherAttendanceById(this.teacherAttendanceId)
                            .map(x => x.json())
                            .subscribe(res => {
                              console.log('getTeacherAttendanceById res', res);
                              if (res.data) {
                                this.student
                                  .getStudentBySchoolAndClassAndSession(this.teacherData.schoolId, res.data.classId, res.data.sessionId)
                                  .map(x => x.json())
                                  .subscribe(studentRes => {
                                    console.log('studentRes', studentRes);
                                    this.studentData = studentRes.data.map(function (val) {
                                      val.isPresent = true;
                                      return val;
                                    }).sort((a, b) => {
                                      if (a.schoolDetail.rollNo && b.schoolDetail.rollNo) {
                                        return parseInt(a.schoolDetail.rollNo, 10) - parseInt(b.schoolDetail.rollNo, 10);
                                      } else {
                                        return parseInt(a.schoolDetail.admissionNumber, 10) - parseInt(b.schoolDetail.admissionNumber, 10);
                                      }
                                    });
                                  });
                              } else {
                                this.alert.error('No student found!', 'Error');
                              }
                            }, err => {
                              this.alert.error('Error in fetching data', 'Error');
                            })
                        });
                      }
                    })
                }
              }
            });
        } else {
          this.alert.error('No teacher found from this login id!', 'Error');
        }
      });
  }


  togglePresent(data) {
    data.isPresent = !data.isPresent;
  }

  toggleTake() {
    this.isIcon = !this.isIcon;
  }

  submitAttendanceTimeTable(isSms?) {
    const self = this;
    const toSubmitData = this.studentData.map(function (val) {
      const temp = {
        studentId: val._id,
        teacherTimetableId: self.teacherTimeTableData._id,
        schoolId: self.teacherData.schoolId,
        subjectId: self.teacherTimeTableData.subjectId,
        rollNo: val.schoolDetail.rollNo || val.schoolDetail.admissionNumber,
        sessionId: val.schoolDetail.sessionId,
        name: val.name,
        isSms: !!isSms,
        classId: self.teacherTimeTableData.classId,
        createdById: self.userData._id,
        status: 'present',
        date: moment().format('DD-MM-YYYY')
      };
      if (!val.isPresent) {
        temp.status = 'absent';
      }
      return temp;
    });
    this.attendance.saveAttendance(toSubmitData)
      .map(x => x.json())
      .subscribe(res => {
        console.log('api res', res);
        let mesSuf = '';
        if (isSms) {
          mesSuf = ' with sms';
        }
        this.alert.success(res.message + mesSuf + '!', 'Success');
        this.router.navigate(['/school/teacher/attendance/add']);
      });
    console.log('studentData', this.studentData);
    console.log('toSubmitData', toSubmitData);
  }

  submitAttendanceList(isSms?) {
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
          mesSuf = ' with SMS';
        }
        this.alert.success('Attendance saved' + mesSuf + '!', 'Success');
        this.router.navigate(['/school/teacher/attendance/add']);
      });
  }
}
