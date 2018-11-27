import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {ClassService} from '../../../../shared/services/class.service';
import {SessionService} from '../../../../shared/services/session.service';
import {StudentService} from '../../../../shared/services/student.service';

const ls = localStorage;

@Component({
  selector: 'app-school-admin-student-csv',
  templateUrl: './school-admin-student-csv.component.html',
  styleUrls: ['./school-admin-student-csv.component.scss']
})
export class SchoolAdminStudentCsvComponent implements OnInit {
  schoolData = {
    _id: ''
  };
  userData = {
    _id: ''
  };
  classData = [];
  sessionData = [];
  selectedClass: string;
  selectedSession: string;

  constructor(private router: Router,
              private school: SchoolService,
              private student: StudentService,
              private cls: ClassService,
              private session: SessionService,
              private alert: ToastrService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.selectedClass = ls.getItem('selectedClass') || '';
    this.selectedSession = ls.getItem('selectedSession') || '';
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
          this.session.getSessionBySchoolId(this.schoolData._id.toString())
            .map(x => x.json())
            .subscribe(res2 => {
              console.log('res2', res2);
              if (res2.data && res2.data.length) {
                this.sessionData = res2.data;
              } else {
                this.alert.error('Not able to fetch class information!');
              }
            });
        } else {
          this.alert.error('Not able to fetch school information!', 'Reload Page');
        }
      })
  }

  getCsv(type) {
    console.log('type', type);
    if (type === 'blank') {
      window.open('https://inforida.in/samplecsv/blankStudent.csv');
    } else {
      window.open('https://inforida.in/samplecsv/sampleStudent.csv');
    }
    // this.student.getCsv(type);
  }

  uploadCsv(event) {
    console.log('event', event);
    console.log('event.target.files', event.target.files);
    const fileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData: FormData = new FormData();
      formData.append('csv', file, file.name);
      formData.append('classId', this.selectedClass);
      formData.append('sessionId', this.selectedSession);
      formData.append('schoolId', this.schoolData._id.toString());
      formData.append('createdById', this.userData._id.toString());
      console.log('formData', formData);
      this.student.addStudentCsv(formData)
        .map(x => x.json())
        .subscribe(res => {
          console.log('res', res);
          if (res.success) {
            this.alert.success(res.message, 'Success!!');
            ls.setItem('selectedClass', this.selectedClass);
            ls.setItem('selectedSession', this.selectedSession);
            this.router.navigate(['/school/admin/student/view']);
          } else {
            if (res.type) {
              if (res.type === 'adup') {
                if (res.data && res.data.duplicateRno) {
                  const dups = Object.keys(res.data.duplicateRno);
                  this.alert.error(dups.join(',') + ' Admission Numbers present multiple times in csv', 'Error!!');
                } else {
                  this.alert.error(res.error, 'Error!!');
                }
              } else if (res.type === 'sdup') {
                if (res.data && res.data.duplicateRno) {
                  const dups = Object.keys(res.data.duplicateRno);
                  this.alert.error(dups.join(',') + ' SR Numbers present multiple times in csv', 'Error!!');
                } else {
                  this.alert.error(res.error, 'Error!!');
                }
              } else if (res.type === 'addup') {
                if (res.data && res.data.duplicateRno) {
                  const dups = Object.keys(res.data.duplicateRno);
                  this.alert.error(dups.join(',') + ' Aadhaar Ids present multiple times in csv', 'Error!!');
                } else {
                  this.alert.error(res.error, 'Error!!');
                }
              } else if (res.type === 'aexist') {
                if (res.data) {
                  const dups = Object.keys(res.data);
                  this.alert.error(dups.join(',') + ' Admission Numbers already exists', 'Error!!');
                } else {
                  this.alert.error(res.error, 'Error!!');
                }
              } else if (res.type === 'sexist') {
                if (res.data) {
                  const dups = Object.keys(res.data);
                  this.alert.error(dups.join(',') + ' SR Numbers already exists in your school.', 'Error!!');
                } else {
                  this.alert.error(res.error, 'Error!!');
                }
              } else if (res.type === 'adexist') {
                if (res.data) {
                  const dups = Object.keys(res.data);
                  this.alert.error(dups.join(',') + ' Aadhaar Ids already exists in your school.', 'Error!!');
                } else {
                  this.alert.error(res.error, 'Error!!');
                }
              } else {
                this.alert.error(res.error, 'Error!!');
              }
            } else {
              this.alert.error(res.error, 'Error!!');
            }
          }

        }, err => {
          err = err.json();
          console.log('err', err);
          this.alert.error(err.error, 'Error!!');
        })
    } else {
      this.alert.error('No File selected', 'Error!!');
    }
  }

}
