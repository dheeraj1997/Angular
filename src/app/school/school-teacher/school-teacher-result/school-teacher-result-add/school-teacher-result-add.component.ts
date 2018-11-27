import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SchoolService} from '../../../../shared/services/school.service';
import {ExaminationService} from '../../../../shared/services/examination.service';
import {ClassService} from '../../../../shared/services/class.service';
import {SubjectService} from '../../../../shared/services/subject.service';
import {TeacherService} from '../../../../shared/services/teacher.service';
import {StudentService} from '../../../../shared/services/student.service';
import {ResultService} from '../../../../shared/services/result.service';


const ls = localStorage;

@Component({
  selector: 'app-school-teacher-result-add',
  templateUrl: './school-teacher-result-add.component.html',
  styleUrls: ['./school-teacher-result-add.component.scss']
})
export class SchoolTeacherResultAddComponent implements OnInit {
  selectedExam = '';
  selectedClass = '';
  selectedSubject = '';
  schoolData: any;
  studentData = [];
  initialStudentData: string;
  examinationData = [];
  initialExamData: string;
  searchString: string;
  maxMarks: Number = 0;
  selectedSession = '';
  studentIdMap = {};
  classData = [];
  teacherData = [];
  subjectData = [];
  initialSubjectData: string;
  toShowData = [];
  resultData = {
    _id: '',
    sessionId: '',
    schoolId: '',
    classId: '',
    subjectId: '',
    examId: '',
    markList: [],
    createdById: ''
  };
  isDisable = false;
  userData = JSON.parse(ls.getItem('userData'));

  constructor(private School: SchoolService,
              private Cls: ClassService,
              private Subject: SubjectService,
              private Teacher: TeacherService,
              private alert: ToastrService,
              private student: StudentService,
              private router: Router,
              private examination: ExaminationService,
              private result: ResultService) {
  }

  ngOnInit() {
    this.userData = JSON.parse(ls.getItem('userData'));
    this.resultData.createdById = this.userData._id;
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
                  this.getExam();
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
                  this.initialSubjectData = JSON.stringify(this.subjectData);
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
    this.examinationData = JSON.parse(this.initialExamData).filter(val => {
      return val.classId === this.selectedClass;
    });
    this.getExam();
  }

  onExamSelect() {
    const tempExam = this.examinationData.find(val => val._id.toString() === this.selectedExam);
    const allExamSubjects = tempExam.marks.map(val => val.subjectId.toString());
    console.log('allExamSubjects', allExamSubjects);
    this.subjectData = JSON.parse(this.initialSubjectData).filter(val => {
      return allExamSubjects.indexOf(val._id.toString()) !== -1;
    });
    this.getExam();
  }

  onSubjectSelect() {
    this.getExam();
  }

  getExam() {
    this.examination.getExamBySchoolId(this.schoolData._id, this.selectedSession)
      .map(x => x.json())
      .subscribe(res2 => {
        if (res2.data && res2.data.length) {
          console.log('res2', res2);
          this.examinationData = res2.data;
          this.initialExamData = JSON.stringify(res2.data);
          this.getStudents();
        } else {
          this.alert.error('No Exam found!');
        }
      })
  }

  getMarks() {
    const schoolId = this.schoolData._id;
    const classId = this.selectedClass;
    const sessionId = this.selectedSession;
    const subjectId = this.selectedSubject;
    const examId = this.selectedExam;
    if (schoolId && classId && sessionId && subjectId && examId) {
      ls.setItem('selectedClass', classId);
      ls.setItem('selectedExam', examId);
      ls.setItem('selectedSession', sessionId);
      ls.setItem('selectedSubject', subjectId);
      this.result.getMarks(schoolId, sessionId, classId, examId, subjectId)
        .map(x => x.json())
        .subscribe(resultRes => {
          console.log('resultRes', resultRes);
          if (resultRes.data && resultRes.data._id) {
            this.resultData = resultRes.data;
            this.resultData.markList = this.resultData.markList.map(val => {
              val.rollNo = this.studentIdMap[val.studentId].rollNo;
              val.name = this.studentIdMap[val.studentId].name;
              return val;
            }).sort((a, b) => {
              if (a.rollNo && b.rollNo) {
                return parseInt(a.rollNo, 10) - parseInt(b.rollNo, 10);
              }
            });
          }
        });
    } else {
      this.alert.error(' Incomplete Data', 'Error');
    }
  }

  getStudents() {
    const schoolId = this.schoolData._id;
    const classId = this.selectedClass;
    const sessionId = this.selectedSession;
    const subjectId = this.selectedSubject;
    const examId = this.selectedExam;
    if (schoolId && classId && sessionId && subjectId && examId) {
      const tempExam = this.examinationData.find(val => val._id.toString() === this.selectedExam);
      const tempSubject = tempExam.marks.find(val => val.subjectId.toString() === this.selectedSubject);
      this.maxMarks = tempSubject.maxMarks;
      this.student
        .getStudentBySchoolAndClassAndSession(schoolId, classId, sessionId)
        .map(y => y.json())
        .subscribe(res2 => {
          console.log('studres2', res2);
          if (res2.data && res2.data.length) {
            this.studentData = res2.data;
            this.resultData.markList = [];
            delete this.resultData._id;
            this.studentIdMap = this.studentData.reduce((a, p) => {
              a[p._id] = {rollNo: p.schoolDetail.rollNo, name: p.name};
              this.resultData.markList.push({
                studentId: p._id,
                marks: 0,
                rollNo: p.schoolDetail.rollNo,
                name: p.name
              });
              return a;
            }, {});
            this.initialStudentData = JSON.stringify(res2.data);
            this.getMarks();
          } else {
            this.studentData = [];
            this.alert.error('No student information!', 'Error');
          }
        })
    }
  }

  submitMarks() {
    this.resultData.schoolId = this.schoolData._id;
    this.resultData.classId = this.selectedClass;
    this.resultData.sessionId = this.selectedSession;
    this.resultData.subjectId = this.selectedSubject;
    this.resultData.examId = this.selectedExam;
    this.result.submitMarks(this.resultData)
      .map(x => x.json())
      .subscribe(res4 => {
          this.alert.success(res4.message, 'Success');
          // this.router.navigate(['/school/teacher/result/view']);
        },
        err => {
          console.log('err', err);
          this.alert.error(err.error, 'Error');
          console.log('errorResultData', this.resultData);
        });
  }
}
