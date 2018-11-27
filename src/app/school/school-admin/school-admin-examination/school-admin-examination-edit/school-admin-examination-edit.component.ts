import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {SessionService} from '../../../../shared/services/session.service';
import {SubjectService} from '../../../../shared/services/subject.service';
import {ClassService} from '../../../../shared/services/class.service';
import {ExaminationService} from '../../../../shared/services/examination.service';
import * as moment from 'moment';

const ls = localStorage;
const today = new Date();

@Component({
  selector: 'app-school-admin-examination-edit',
  templateUrl: './school-admin-examination-edit.component.html',
  styleUrls: ['./school-admin-examination-edit.component.scss']
})

export class SchoolAdminExaminationEditComponent implements OnInit {
  userData = JSON.parse(ls.getItem('userData'));
  schoolData = {
    _id: '',
    currentSession: ''
  };
  classData = [];
  subjectData = [];
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

  constructor(private subject: SubjectService,
              private cls: ClassService,
              private school: SchoolService,
              private session: SessionService,
              private alert: ToastrService,
              private examination: ExaminationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const examId = params['examId'];
      console.log('examIdthis', examId);
      this.examination.getExamById(examId)
        .map(x => x.json())
        .subscribe(res => {
          console.log('examRes', res);
          if (res.success) {
            this.examinationData = res.data;
            console.log('examinationData', this.examinationData);
          }
        }, err => {
          this.alert.error('Something went wrong!', 'Fatal Error!');
          this.router.navigate(['/school/admin/examination/view']);
        })
    });
    this.userData = JSON.parse(ls.getItem('userData'));
    this.school.getSchoolByLoginId(this.userData._id.toString())
      .map(x => x.json())
      .subscribe(res => {
        if (res && res.data && res.data._id) {
          console.log('school id', res.data._id);
          this.schoolData = res.data;
          this.examinationData.schoolId = this.schoolData._id;
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
            this.session.getSessionBySchoolId(this.schoolData._id)
              .map(x => x.json())
              .subscribe(sesRes => {
                this.sessionData = sesRes.data;
              });
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
      this.examination.editExam(this.examinationData)
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

