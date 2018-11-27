import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {SubjectService} from '../../../../shared/services/subject.service';
import {ClassService} from '../../../../shared/services/class.service';
import {SessionService} from '../../../../shared/services/session.service';
import {ExaminationService} from '../../../../shared/services/examination.service';
import * as moment from 'moment';

const ls = localStorage;
const today = new Date();

@Component({
  selector: 'app-school-admin-examination-add',
  templateUrl: './school-admin-examination-add.component.html',
  styleUrls: ['./school-admin-examination-add.component.scss']
})
export class SchoolAdminExaminationAddComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  schoolData = {
    _id: '',
    currentSession: ''
  };
  classData = [];
  subjectData = [];
  subjectDataCopy = [];
  sessionData = [];
  examinationData = {
    schoolId: '',
    name: '',
    classId: '',
    sessionId: '',
    marks: [],
    createdById: ''
  };
  subjectRow = {
    maxMarks: '',
    subjectId: '',
    start: '',
    end: '',
    date: {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()}
  };
  isDisable = false;

  constructor(private router: Router,
              private subject: SubjectService,
              private cls: ClassService,
              private school: SchoolService,
              private session: SessionService,
              private alert: ToastrService,
              private examination: ExaminationService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.examinationData.createdById = this.userData._id;
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        if (res && res.data && res.data._id) {
          console.log('school id', res.data._id);
          this.schoolData = res.data;
          this.examinationData.schoolId = this.schoolData._id;
          this.examinationData.sessionId = this.schoolData.currentSession;
          this.addNewRow();
          console.log('schoolres', res);
          if (res.data._id) {
            this.cls.getClassBySchoolId(res.data._id)
              .map(x => x.json())
              .subscribe(res2 => {
                this.classData = res2.data;
              });
            this.subject.getSubjectBySchoolId(res.data._id)
              .map(x => x.json())
              .subscribe(res3 => {
                this.subjectData = res3.data;
              });
            this.session.getSessionBySchoolId(res.data._id)
              .map(x => x.json())
              .subscribe(res3 => {
                this.sessionData = res3.data;
              })
          } else {
            this.alert.error('School Data not found ' + ' Reload ! ', 'Error')
          }

        } else {
          this.alert.error('School not found ' + ' Reload ! ', 'Error')
        }
      })
  }

  addNewRow() {
    const temp = JSON.parse(JSON.stringify(this.subjectRow));
    if (this.examinationData.marks.length) {
      temp.maxMarks = this.examinationData.marks[this.examinationData.marks.length - 1].maxMarks;
      temp.start = this.examinationData.marks[this.examinationData.marks.length - 1].start;
      temp.end = this.examinationData.marks[this.examinationData.marks.length - 1].end;
      const tempStartDate = this.examinationData.marks[this.examinationData.marks.length - 1].date;
      const stDate = moment(tempStartDate.year + '-' + tempStartDate.month + '-' + tempStartDate.day, 'YYYY-MM-DD');
      let dateHere = moment(stDate.format('DD-MM-YYYY'), 'DD-MM-YYYY').add(1, 'day');
      if (stDate.format('dddd').toLowerCase() === 'saturday') {
        dateHere = moment(stDate.format('DD-MM-YYYY'), 'DD-MM-YYYY').add(2, 'days');
      }
      temp.date = {
        day: parseInt(dateHere.format('DD'), 10),
        month: parseInt(dateHere.format('MM'), 10),
        year: parseInt(dateHere.format('YYYY'), 10)
      }
    }
    this.examinationData.marks.push(temp);
  }

  subjectSelect(ind) {
    this.subjectData[ind].isDisable = !this.subjectData[ind].isDisable;
  }

  deleteRow(ind) {
    this.examinationData.marks.splice(ind, 1);
  }

  submitExamination() {
    this.isDisable = true;
    console.log('examData', this.examinationData);
    if (!this.examinationData.classId ||
      !this.examinationData.schoolId ||
      !this.examinationData.name ||
      !this.examinationData.sessionId) {
      this.alert.error('Data Incomplete ! ', 'Error');
    } else {
      this.examination.saveExam(this.examinationData)
        .map(x => x.json())
        .subscribe(res4 => {
          console.log('examData', this.examinationData);
          this.alert.success(res4.message, 'Success');
          this.router.navigate(['/school/admin/examination/view']);
        }, err => {
          err = err.json();
          console.log('err', err);
          this.alert.error(err.error, 'Error');
        })
    }
  }
}
