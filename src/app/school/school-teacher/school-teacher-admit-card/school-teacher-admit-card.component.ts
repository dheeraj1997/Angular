import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchoolService} from '../../../shared/services/school.service';
import {ExaminationService} from '../../../shared/services/examination.service';
import {ClassService} from '../../../shared/services/class.service';
import {SubjectService} from '../../../shared/services/subject.service';
import {TeacherService} from '../../../shared/services/teacher.service';
import {StudentService} from '../../../shared/services/student.service';
import {ResultService} from '../../../shared/services/result.service';

const ls = localStorage;

@Component({
  selector: 'app-school-teacher-admit-card',
  templateUrl: './school-teacher-admit-card.component.html',
  styleUrls: ['./school-teacher-admit-card.component.scss']
})
export class SchoolTeacherAdmitCardComponent implements OnInit {

  userData = JSON.parse(ls.getItem('userData'));
  selectedExam = '';
  selectedClass = '';
  schoolData: any;
  initialData: string;
  searchString: string;
  selectedSession = '';
  selectedExamData = {
    marks: []
  };
  classData = [];
  teacherData = [];
  subjectData = [];
  examinationData = [];
  initialExaminationData = '';
  toShowData = [];

  constructor(private School: SchoolService,
              private Cls: ClassService,
              private Teacher: TeacherService,
              private alert: ToastrService,
              private student: StudentService,
              private examination: ExaminationService,
              private result: ResultService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
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
                  this.selectedSession = scres.data.currentSession;
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
    this.examinationData = JSON.parse(this.initialExaminationData).filter(val => val.classId === this.selectedClass);
  }

  getExams() {
    this.examination.getExamBySchoolId(this.schoolData._id, this.selectedSession)
      .map(x => x.json())
      .subscribe(eres => {
        console.log('eres', eres);
        if (eres.data.length) {
          this.examinationData = eres.data;
          this.initialExaminationData = JSON.stringify(eres.data);
        }
      });
  }

  printAdmitCard(stu) {
    this.result.getAdmitCard({})
      .map(x => x.json())
      .subscribe(res => {
        if (res.success) {
          window.open('https://inforida.in/admitCard/' + res.filename);
          // window.open('https://inforida.in/admitCard/' + res.filename);
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

    this.selectedExamData = this.examinationData.find(val => val._id.toString() === examId);
    if (schoolId && sessionId && classId && examId) {
      this.student.getStudentBySchoolAndClassAndSession(schoolId, classId, sessionId)
        .map(x => x.json())
        .subscribe(res => {
          if (res.success) {
            console.log('getResultByExam', res);
            this.toShowData = res.data;
            this.initialData = JSON.stringify(res.data);
          }
        })
    }
  }
}
