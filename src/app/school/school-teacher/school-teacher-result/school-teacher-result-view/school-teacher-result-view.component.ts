import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../../shared/services/school.service';
import {ExaminationService} from '../../../../shared/services/examination.service';
import {ClassService} from '../../../../shared/services/class.service';
import {SubjectService} from '../../../../shared/services/subject.service';
import {TeacherService} from '../../../../shared/services/teacher.service';
import {StudentService} from '../../../../shared/services/student.service';
import {ResultService} from '../../../../shared/services/result.service';

const ls = localStorage;

@Component({
  selector: 'app-school-teacher-result-view',
  templateUrl: './school-teacher-result-view.component.html',
  styleUrls: ['./school-teacher-result-view.component.scss']
})
export class SchoolTeacherResultViewComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  selectedExam = '';
  selectedClass = '';
  selectedSubject = '';
  schoolData: any;
  initialData: string;
  searchString: string;
  selectedSession = '';
  subjectNameIdMap = {};
  selectedExamData = {
    marks: []
  };
  classData = [];
  teacherData = [];
  subjectData = [];
  examinationData = [];
  initialExaminationData = '';
  examData = {
    maxmarks: ''
  };
  nameToView = '';
  studentData = [];
  toShowData = [];
  resultData = {};

  constructor(private School: SchoolService,
              private Cls: ClassService,
              private Subject: SubjectService,
              private Teacher: TeacherService,
              private alert: ToastrService,
              private student: StudentService,
              private modalService: NgbModal,
              private examination: ExaminationService,
              private result: ResultService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.selectedSession = ls.getItem('selectedSession');
    this.selectedClass = ls.getItem('selectedClass');
    this.selectedExam = ls.getItem('selectedExam');
    this.selectedSubject = ls.getItem('selectedSubject');
    this.Teacher.getTeacherByLoginId(this.userData._id)
      .map(x => x.json())
      .subscribe(tRes => {
        if (tRes && tRes.data && tRes.data._id) {
          this.teacherData = tRes.data;
          console.log('tRes', tRes);
          if (tRes.data.schoolId) {
            this.School.getSchoolById(tRes.data.schoolId)
              .map(x => x.json())
              .subscribe(scres => {
                console.log('scres', scres);
                this.schoolData = scres.data;
                if (scres.data.currentSession) {
                  this.selectedSession = this.selectedSession || scres.data.currentSession;
                  this.getExams();
                }
              });
            this.Cls.getClassBySchoolId(tRes.data.schoolId)
              .map(x => x.json())
              .subscribe(cres => {
                console.log('cres', cres);
                if (cres.data.length) {
                  this.classData = cres.data;
                }
              });
            this.Subject.getSubjectBySchoolId(tRes.data.schoolId)
              .map(x => x.json())
              .subscribe(sures => {
                console.log('sures', sures);
                if (sures.data.length) {
                  this.subjectData = sures.data;
                  this.subjectNameIdMap = this.subjectData.reduce((a, p) => {
                    a[p._id] = p.name;
                    return a;
                  }, {})
                }
              })
          } else {
            this.alert.error('School not found ! ' + 'Reload!', ' Error');
          }
        } else {
          this.alert.error('Teacher not found !', ' Error');
        }
      })
  }

  onClassSelect() {
    console.log('this.selectedClass', this.selectedClass);
    console.log('this.selectedExam', this.selectedExam);
    this.examinationData = JSON.parse(this.initialExaminationData).filter(val => val.classId === this.selectedClass);
    this.getStudents();
  }

  getExams() {
    if (this.schoolData._id && this.selectedSession) {
      this.examination.getExamBySchoolId(this.schoolData._id, this.selectedSession)
        .map(x => x.json())
        .subscribe(eres => {
          console.log('eres', eres);
          if (eres.data.length) {
            this.examinationData = eres.data;
            this.initialExaminationData = JSON.stringify(eres.data);
            this.getStudents();
          }
        });
    }
  }

  printResult(stu) {
    this.result.getReportCard({})
      .map(x => x.json())
      .subscribe(res => {
        if (res.success) {
          window.open('https://inforida.in/reportCard/' + res.filename);
        }
      })
  }

  getStudents() {
    console.log('this.schoolData._id', this.schoolData._id);
    console.log('this.selectedSession', this.selectedSession);
    console.log('this.selectedClass', this.selectedClass);
    console.log('this.selectedExam', this.selectedExam);

    const schoolId = this.schoolData._id;
    const sessionId = this.selectedSession;
    const classId = this.selectedClass;
    const examId = this.selectedExam;
    this.selectedExamData = this.examinationData.find(val => val._id.toString() === examId) || {marks: []};
    if (schoolId && sessionId && classId && examId && this.selectedExamData) {
      // this.examinationData = JSON.parse(this.initialExaminationData).filter(val => val.classId === this.selectedClass);
      this.result.getResultByExam(schoolId, sessionId, classId, examId)
        .map(x => x.json())
        .subscribe(res => {
          if (res.success) {
            console.log('getResultByExam', res);
            this.toShowData = res.data.filter(val => val.result).sort((a, b) => {
              if (a.rollNo && b.rollNo) {
                return parseInt(a.rollNo, 10) - parseInt(b.rollNo, 10);
              }
            });
            this.initialData = JSON.stringify(res.data);
          } else {
            this.toShowData = [];
            this.initialData = JSON.stringify([]);
          }
        })
    }
  }

  search(e) {
    console.log('e', e);
    if (e) {
      const pattern = new RegExp(e, 'i');
      this.toShowData = this.toShowData.filter(val => {
        return pattern.test(val.name);
      });
      if (!this.toShowData.length) {
        this.toShowData = JSON.parse(this.initialData);
      }
    } else {
      this.toShowData = JSON.parse(this.initialData);
    }
  }
}


