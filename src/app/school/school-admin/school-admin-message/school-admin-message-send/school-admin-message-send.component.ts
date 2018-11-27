import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {SchoolService} from '../../../../shared/services/school.service';
import {ClassService} from '../../../../shared/services/class.service';
import {StudentService} from '../../../../shared/services/student.service';
import {TeacherService} from '../../../../shared/services/teacher.service';
import {StaffService} from '../../../../shared/services/staff.service';

const ls = localStorage;


@Component({
  selector: 'app-school-admin-message-send',
  templateUrl: './school-admin-message-send.component.html',
  styleUrls: ['./school-admin-message-send.component.scss']
})
export class SchoolAdminMessageSendComponent implements OnInit {
  schoolData = {
    _id: ''
  };
  userData = {_id: ''};
  classData = [];
  studentData = [];
  teacherData = [];
  staffData = [];
  selectAllStudents = false;
  selectAllTeachers = false;
  selectAllStaff = false;
  text = '';
  lang = 'eng';
  totalChar = 0;
  teacherSelect = false;
  staffSelect = false;
  disabledSend = false;

  constructor(private router: Router,
              private school: SchoolService,
              private student: StudentService,
              private teacher: TeacherService,
              private staff: StaffService,
              private cls: ClassService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    if (this.userData._id) {
      this.school.getSchoolByLoginId(this.userData._id.toString())
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res && res.data && res.data._id) {
            this.schoolData = res.data;
            this.cls.getClassBySchoolId(this.schoolData._id.toString())
              .map(x => x.json())
              .subscribe(res2 => {
                console.log('res2', res2);
                if (res2.data && res2.data.length) {
                  this.classData = res2.data;
                } else {
                  this.alert.error('Not able to fetch class information!');
                }
              });
          } else {
            this.alert.error('Not able to fetch school information!', 'Reload Page');
          }
        })
    }
  }

  addClassStudents(cId, e) {
    if (e) {
      this.student.getStudentBySchoolClass(this.schoolData._id, cId)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.alert.success(res.message, 'Success!!');
            const tempData = res.data.map(val => {
              val.selected = false;
              return val;
            });
            this.studentData = this.studentData.concat(tempData);
          } else {
            this.alert.error(res.error, 'Error!');
          }
        })
    } else {
      console.log('this.cId', cId);
      console.log('this.studentData', this.studentData);
      this.studentData = this.studentData.filter(val => {
        return val.schoolDetail.classId !== cId;
      });
      console.log('this.studentData', this.studentData);
    }
  }

  addTeachers(e) {
    if (e) {
      this.teacher.getTeacherBySchoolId(this.schoolData._id)
        .map(x => x.json())
        .subscribe(res => {
          console.log('getTeacherBySchoolId res', res);
          if (res.success) {
            this.alert.success(res.message, 'Success!!');
            const tempData = res.data.map(val => {
              val.selected = false;
              return val;
            });
            console.log('tempData', tempData);
            this.teacherData = tempData;
          } else {
            this.alert.error(res.error, 'Error!');
          }
        })
    } else {
      this.teacherData = [];
    }
  }

  addStaff(e) {
    if (e) {
      this.staff.getStaffBySchoolId(this.schoolData._id)
        .map(x => x.json())
        .subscribe(res => {
          console.log('getStaffBySchoolId res', res);
          if (res.success) {
            this.alert.success(res.message, 'Success!!');
            const tempData = res.data.map(val => {
              val.selected = false;
              return val;
            });
            console.log('tempData', tempData);
            this.staffData = tempData;
          } else {
            this.alert.error(res.error, 'Error!');
          }
        })
    } else {
      this.staffData = [];
    }
  }


  selectAllStudent(e) {
    if (e) {
      this.studentData.forEach(val => {
        val.selected = true;
      });
      this.selectAllStudents = true;
    } else {
      this.studentData.forEach(val => {
        val.selected = false;
      });
      this.selectAllStudents = false;
    }

  }

  selectAllTeacher(e) {
    if (e) {
      this.teacherData.forEach(val => {
        val.selected = true;
      });
      this.selectAllTeachers = true;
    } else {
      this.teacherData.forEach(val => {
        val.selected = false;
      });
      this.selectAllTeachers = false;
    }

  }

  selectAllStaffs(e) {
    if (e) {
      this.staffData.forEach(val => {
        val.selected = true;
      });
      this.selectAllStaff = true;
    } else {
      this.staffData.forEach(val => {
        val.selected = false;
      });
      this.selectAllStaff = false;
    }

  }

  countUpdate() {
    this.totalChar = this.text.length;
  }


  submitSms() {
    if (this.totalChar > 0) {
      const postData = {
        schoolId: this.schoolData._id,
        text: this.text,
        language: this.lang,
        createdById: this.userData._id,
        studentIdArr: [],
        teacherIdArr: [],
        staffIdArr: [],
      };
      postData.studentIdArr = this.studentData
        .filter(val => val.selected)
        .map(val => val._id.toString());
      postData.teacherIdArr = this.teacherData
        .filter(val => val.selected)
        .map(val => val._id.toString());
      postData.staffIdArr = this.staffData
        .filter(val => val.selected)
        .map(val => val._id.toString());
      if (!postData.studentIdArr.length && !postData.teacherIdArr.length && !postData.staffIdArr.length) {
        this.alert.error('No Contact Selected', 'Error!');
      } else {
        console.log('postData', postData);
        this.school.sendBulkSms(postData)
          .map(x => x.json())
          .subscribe(res => {
            console.log('res', res);
            if (res.success) {
              this.alert.success(res.message, 'Success!!');
              this.router.navigate(['/school/admin/message/history'])
            } else {
              this.alert.error(res.error, 'Error!!');
            }
          }, err => {
            err = err.json();
            this.alert.error(err.error, 'Error!!');
          })
      }
    } else {
      this.alert.error('Please input text message!');
    }
  }
}
